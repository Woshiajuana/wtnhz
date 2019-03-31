
import Loading                          from 'plugins/loading.plugin'
import EnvConfig                        from 'config/env.config'
import UserService                      from 'services/user.service'
import Dialogs                      from 'plugins/dialogs.plugin'

const Stream = weex.requireModule('stream');

const DEFAULT_OPTIONS = {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'fetch',
    useToken: true,             // 是否需要token
    useExit: true,              // 是否执行退出
    timeout: 10000,
    type: 'json',
};

class Http {
    constructor(api, data, opt) {
        this.options = Object.assign({}, DEFAULT_OPTIONS, opt);
        this.api = api;
        this.body = Object.assign({}, data);
        return this['_' + this.options.mode]();
    }
    _fetch () {
        return new Promise((resolve, reject) => {
            let token;
            UserService.get().then((user) => {
                token = user.token;
            }).catch(() => {
                token = '';
            }).finally(() => {
                let {
                    useToken,
                    useExit,
                    method,
                } = this.options;
                if (useToken && !token) {
                    useExit ? reject('您还未登录，请先登录') : reject();
                    return useExit ? UserService.exit() : null;
                }
                this.api = method === 'GET'
                    ? EnvConfig.API_URL + this.api + urlEncode(this.body)
                    : EnvConfig.API_URL + this.api;
                if (token)
                    this.body.token = token;
                this._log(`请求参数=> `, this.body);
                let reqBody = {
                    ...this.options,
                    url: this.api,
                    body: JSON.stringify(this.body),
                };
                Stream.fetch(reqBody, result => {
                    this._log(`请求返回结果=> `, result);
                    let {
                        status,
                        data,
                    } = result;
                    if (status !== 200)
                        return reject('网络繁忙，请稍后再试');
                    let {
                        code,
                        msg
                    } = data;
                    this._log(`请求格式结果=> `, data);
                    if (code === '-1') {
                        // token失效
                        reject(msg);
                        return UserService.exit();
                    }
                    resolve(data);
                });
            });

        })
    }
    _log () {
        console.log(this.api, this.options.method, ...arguments)
    }
}

export default (api, data = {}, options = {}) => {
    let {loading} = options;
    loading !== false && Loading.show();
    return new Http(api, data, options).finally(() => {
        setTimeout(() => {
            loading !== false && Loading.hide();
        },300)
    });
}


// urlEncode
function urlEncode(param, key, encode) {
    if (param === null) return '';
    let paramStr = '';
    let t = typeof (param);
    if (t === 'string' || t === 'number' || t === 'boolean') {
        paramStr += '&' + key + '='  + ((encode === null || encode) ? encodeURIComponent(param) : param);
        return paramStr;
    }
    for (let i in param) {
        let k = key === null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
        paramStr += urlEncode(param[i], k, encode)
    }
    return paramStr;
}
