
import UserService                  from 'services/user.service'
import Http                         from 'plugins/http.plugin'
import Api                          from 'config/api.config'
import Dialogs                      from 'plugins/dialogs.plugin'

const data = () => {
    return {
        user$: '',
    }
};

const methods = {
    userGet () {
        let that = this;
        return new Promise((resolve, reject) => {
            UserService.get().then((info) => {
                that.user$ = info;
                resolve(info);
            }).catch((err) => {
                that.user$ = '';
                reject(err);
            })
        });
    },
    userReq () {
        Http(Api.reqUserInfo, {}, {
            loading: false,
            useExit: false ,
        }).then(({code, data, msg}) => {
            if (code !== '0000')
                throw msg;
            return UserService.upt(data);
        }).then(() => {
            return this.userGet();
        }).then((user) => {
            return Promise.resolve(user);
        }).catch((err) => {
            this.user$ = '';
            Dialogs.toast(err);
            return Promise.reject(err);
        })
    },
};

export default {
    data,
    methods,
}
