
import AuthService                      from 'services/auth.service'

const data = () => {
    return {
        user$: '',
    }
};

const methods = {
    userGet () {
        return new Promise((resolve, reject) => {
            AuthService.getToken().then((info) => {
                this.user$ = info;
                resolve(info);
            }).catch((err) => {
                this.user$ = '';
                reject();
            })
        });
    }
};

export default {
    data,
}
