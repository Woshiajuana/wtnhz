
import UserService                      from 'services/user.service'

const data = () => {
    return {
        user$: '',
    }
};

const methods = {
    user$Get () {
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
};

export default {
    data,
    methods,
}
