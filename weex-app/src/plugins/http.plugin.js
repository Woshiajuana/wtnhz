
import Loading                          from 'plugins/loading.plugin'
import EnvConfig                        from 'config/env.config'

const Stream = weex.requireModule('stream');

const DEFAULT_OPTIONS = {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'fetch',
    auth: true,
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
            this.api = this.options.method === 'GET'
                ? EnvConfig.API_URL + this.api + urlEncode(this.body)
                : EnvConfig.API_URL + this.api;
            this._log(`请求参数`, this.body);
            let reqBody = {
                ...this.options,
                url: this.api,
                body: JSON.stringify(this.body),
            };
            Stream.fetch(reqBody, result => {
                console.log(result);
                let {
                    status,
                    data,
                    statusText,
                } = result;
                if (status === -1)
                    return reject('连接超时，请稍后再试');
                if (status !== 200)
                    return reject('网络繁忙，请稍后再试');
                resolve(data);
            });
        })
    }
    _log () {
        console.log(this.api, this.options.method, ...arguments)
    }
}

export default (api, data = {}, options = {}) => {
    options.loading && Loading.show();
    return new Http(api, data, options).finally(() => {
        options.loading && Loading.hide();
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
