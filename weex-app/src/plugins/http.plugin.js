
import LoadingPlugin                    from 'plugins/loading.plugin'
import EnvConfig                        from 'config/env.config'
// import AuthService                      from 'services/auth.service'
// import ModalPlugin                      from 'plugins/modal.plugin'
// import EncryptPlugin                    from 'plugins/encrypt.plugin'
// import RoleService                      from 'services/role.service'
// import Router                           from 'plugins/router.plugin'

const Stream = weex.requireModule('stream');
const DEFAULT_OPTIONS = {
    method: 'POST',
    mode: 'FETCH',
    auth: true,
};

class Http {
    constructor(api, data, opt) {
        let options = Object.assign({}, DEFAULT_OPTIONS, opt);
        this.api = api;
        this.auth = options.auth;
        this.method = options.method.toLocaleUpperCase();
        this.mode = options.mode.toLocaleLowerCase();
        this.body = Object.assign({}, data);
        return this['_' + this.mode] ();
    }
    _fetch () {
        return new Promise((resolve, reject) => {
            this.api = this.method === 'GET'
                ? EnvConfig.API_URL + this.api + urlEncode(this.body)
                : EnvConfig.API_URL + this.api;
            this._log(`请求参数`, this.body);
            let reqBody = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: this.method,
                url: this.api,
                type: 'json',
                timeout: 10000,
                body: JSON.stringify(this.body),
            };
            Stream.fetch(reqBody, result => {
                if (result.status !== 200)
                    return reject('网络繁忙，请稍后再试');
                resolve(result.data);
            });
        })
    }

    _log () {
        console.log(this.api, this.method, ...arguments)
    }
}

export default (api, data = {}, options = {}) => {
    options.loading && LoadingPlugin.show();
    return new Http(api, data, options).finally(() => {
        options.loading && LoadingPlugin.hide();
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
