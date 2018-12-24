
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
const DEFAULT_OPTIONS = {
    method: 'POST',
    mode: 'FETCH',
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
        this.method = options.method.toLocaleUpperCase();
        this.mode = options.mode.toLocaleLowerCase();
        this.body = Object.assign({}, AppConfig, data);
        return this['_' + this.mode] ();
    }

    _fetch () {
        return new Promise((resolve, reject) => {

            let url = '';
            if (this.method === 'GET') {

            }

            let reqBody = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: this.method,
                url: SourcePlugin.getJson(this.api),
                type: 'json',
                timeout: 10000,
                body: JSON.stringify(this.body),
            };
            Stream.fetch(reqBody, result => {
                if (result.status !== 200) return reject('网络繁忙，请稍后再试');
                resolve(result.data);
            });
        })
    }
}

export default (api, data = {}, options = {}) => {
    options.loading && LoadingPlugin.show();
    return new Http(api, data, options).finally(() => {
        options.loading && LoadingPlugin.hide();
    });
}
