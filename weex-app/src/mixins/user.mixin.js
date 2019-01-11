
import UserService                      from 'services/user.service'

const data = () => {
    return {
        user$: '',
    }
};

const methods = {
    userGet () {
        let that = this;
        console.log(11)
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
