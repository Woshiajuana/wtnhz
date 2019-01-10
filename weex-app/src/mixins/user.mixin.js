
import StorePlugin                      from 'plugins/store.plugin'
import ModalPlugin                      from 'plugins/modal.plugin'

const AUTH_KEY_NAME = 'AUTH_KEY_NAME';
const AUTH_USER_STORE_KEY_NAME = 'AUTH_USER_STORE_KEY_NAME';
const AUTH_USER_CACHE_KEY_NAME = 'AUTH_USER_CACHE_KEY_NAME';

const data = () => {
    return {
        user$: '',
    }
};

const methods = {
    user$Get () {
        let that = this;
        return new Promise((resolve, reject) => {
            StorePlugin.get(AUTH_KEY_NAME).then((info) => {
                that.user$ = info;
                resolve(info);
            }).catch((err) => {
                that.user$ = '';
                reject('用户未登录');
            })
        });
    },
    user$Set (info) {
        let that = this;
        return new Promise((resolve, reject) => {
            StorePlugin.set(AUTH_KEY_NAME, info).then(() => {
                that.user$ = info;
                resolve(info);
            }).catch(() => {
                that.user$ = '';
                reject('存储失败');
            });
        });
    },
    user$Upt (input) {
        let info = {};
        return this.user$Get().then((res) => {
            info = Object.assign(info, res, input);
        }).catch(() => {
            info = input;
        }).finally(() => {
            return this.user$Set(info);
        });
    },
    user$Logout () {
        return new Promise((resolve, reject) => {
            Promise.all([
                StorePlugin.remove(AUTH_KEY_NAME),
                StorePlugin.remove(AUTH_USER_CACHE_KEY_NAME),
            ]).then(() => {
                ModalPlugin.show('wow_user_login');
                resolve();
            }).catch((err) => {
                reject('缓存清除失败');
            })
        })
    },
};

export default {
    data,
    methods,
}
