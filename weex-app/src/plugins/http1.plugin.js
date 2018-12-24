
import LoadingPlugin                    from 'plugins/loading.plugin'
import SourcePlugin                     from 'utils/source.util'
import EnvConfig                        from 'config/env.config'
import AuthService                      from 'services/auth.service'
import ModalPlugin                      from 'plugins/modal.plugin'
import AppConfig                        from 'appConfig/app.config'
import EncryptPlugin                    from 'plugins/encrypt.plugin'
import RoleService                      from 'services/role.service'
import Router                           from 'plugins/router.plugin'

const Stream = weex.requireModule('stream');
const JFHttp = weex.requireModule('jfHttpsModule');
const DEFAULT_OPTIONS = {
    method: 'POST',
    mode: 'AFTER',
    auth: true,
    use_role: [],
    no_role: [],
};

class Http {
    constructor(api, data, opt) {
        let options = Object.assign({}, DEFAULT_OPTIONS, opt);
        this.api = api;
        this.auth = options.auth;
        this.use_role = options.use_role;
        this.no_role = options.no_role;
        this.method = options.method.toLocaleLowerCase();
        this.mode = options.mode.toLocaleLowerCase();
        this.body = Object.assign({}, AppConfig, data);
        return this['_' + this.mode] ();
    }

    // 无须token
    _before() {

        this.api = EnvConfig.API_URL + this.api;
        return new Promise((resolve, reject) => {
            this._log('__请求参数：', this.body);
            JFHttp[this.method](this.api, this.body, (e) => {
                this._handle(e, resolve, reject)
            });
        });
    }

    // 需要token
    _after() {
        this.api = EnvConfig.API_URL + this.api;
        return new Promise((resolve, reject) => {
            AuthService.getToken().then(info => {
                let role = {code: ''};
                RoleService.get().then((r) => {
                    role = r;
                }).catch(() => {
                    // reject('获取用户角色失败');
                }).finally(() => {
                    if (this.use_role.length && this.use_role.indexOf(role.code) === -1) return reject();
                    if (this.no_role.length && this.no_role.indexOf(role.code) > -1) return reject();
                    !this.body.mobileNo && (this.body.mobileNo = info.encryptMobileNo);
                    !this.body.roleCode && (this.body.roleCode = role.code || '');
                    this.body.token = info.token;
                    this._log('__请求参数：', this.body);
                    JFHttp[this.method](this.api, this.body, (e) => {
                        this._handle(e, resolve, reject)
                    });
                });
            }).catch(() => {
                // console.log(this.api + '你还未登录请登录')
                // reject('你还未登录请登录');
                reject();
                this.auth && this._logout();
            });

        });
    }
    // 调用本地json
    _http () {
        return new Promise((resolve, reject) => {
            let reqBody = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'GET',
                url: SourcePlugin.getJson(this.api),
                type: 'json',
                timeout: 10000
            };
            Stream.fetch(reqBody, result => {
                if (result.status !== 200) return reject('网络繁忙，请稍后再试');
                resolve(result.data);
            });
        })
    }

    // 调用福店创建订单
    _order () {
        this.api = EnvConfig.API_NEXTPAY + this.api;
        console.log('进入到http' , this.api);
        return new Promise((resolve, reject) => {
            AuthService.getToken().then(info => {
                !this.body.mobileNo && (this.body.mobileNo = info.encryptMobileNo);
                !this.body.roleCode && (this.body.roleCode = info.roleCode);
                this.body.token = info.token;
                return EncryptPlugin.getUUID(info.mobileNo)
            }).then(uuid => {
                this.body.uuid = uuid;
                this.body.app_user = this.body.appUser;
                delete this.body.appUser;
                this._log('__请求参数：', this.body);
                return EncryptPlugin.md5({req: JSON.stringify(this.body)});
            }).then(md5 => {
                let reqBody = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: this.method.toLocaleUpperCase(),
                    url: this.api,
                    type: 'text',
                    timeout: 15 * 1000
                };
                if (this.method === 'get') {
                    reqBody.url = reqBody.url + '?req=' + md5.req + '&sign=' + md5.sign + '&ts=' + md5.ts;
                } else if (this.method === 'post') {
                    reqBody.body = 'req=' + md5.req + '&sign=' + md5.sign + '&ts=' + md5.ts;
                }
                JFHttp.fetchPlus(reqBody, result => {
                    this._log('__请求返回结果：', result);
                    if (result.status !== 200) { return reject('请求失败'); }
                    try {
                        let decode = decodeURIComponent(result.data);
                        const index = decode.indexOf('\{');
                        const lastIndex = decode.lastIndexOf('\}');
                        decode = decode.substr(index, lastIndex - index + 1);
                        const respData = JSON.parse(decode);
                        if (respData.code === '0001' || respData.code === '0002') {
                            reject(respData.msg);
                            this._logout();
                        } else {
                            resolve(respData);
                        }
                    } catch(e) {
                        console.log('错误', e);
                        reject(e);
                    }
                });
            })
        })
    }

    // 逻辑处理
    _handle(e, resolve, reject) {
        this._log('__请求返回参数：', e);
        let result = e.data;
        if (e.code !== '0000' || !result) return reject('请求失败');
        let code = result.respCode;
        switch (code){
            case '304':
            case '308':
                reject();
                break;
            case 'PE15':
                reject(result.respDesc);
                Router.root();
                this._logout();
                break;
            default:
                resolve(result);
                break;
        }
    }

    // 日志
    _log(str, data = '') {
        console.log(this.api + str, data);
    }

    // 清空用户登录信息
    _logout() {
        AuthService.logout().finally(() => ModalPlugin.show('kdb_user_login'));
    }

}

export default (api, data = {}, options = {}) => {
    options.loading && LoadingPlugin.show();
    return new Http(api, data, options).finally(() => {
        options.loading && LoadingPlugin.hide();
    });
}
