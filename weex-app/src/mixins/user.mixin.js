
import StorePlugin                      from 'plugins/store.plugin'

const AUTH_KEY_NAME = 'AUTH_KEY_NAME';
const AUTH_USER_STORE_KEY_NAME = 'AUTH_USER_STORE_KEY_NAME';

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
    user$Del () {
        StorePlugin.remove();
    },
    user$Login () {

    },
    user$StoreSet (key, value) {
        let email = '';
        let data = {};
        return this.user$Get().then((info) => {
            email = info.email;
            return StorePlugin.get(`${AUTH_USER_STORE_KEY_NAME}${email}`);
        }).then((res) => {
            data = Object.assign(data, res);
            data[key] = value;
        }).catch(() => {
            data[key] = value;
        }).finally(() => {
            if (!email)
                return Promise.reject('用户未登录');
            return StorePlugin.set(`${AUTH_USER_STORE_KEY_NAME}${email}`);
        })
    },
    user$StoreGet (key) {
        let that = this;
        let email = '';
        return new Promise((resolve, reject) => {
            that.user$Get().then((info) => {
                email = info.email;
                return StorePlugin.get(`${AUTH_USER_STORE_KEY_NAME}${email}`);
            }).then((res) => {
                let value = res[key];
                resolve(value);
            }).catch(() => {
                if (!email)
                    return reject('用户未登录');
                reject('获取失败');
            })
        })
    },
    user$StoreDel (key) {
        let that = this;
        let email = '';
        return new Promise((resolve, reject) => {
            that.user$Get().then((info) => {
                email = info.email;
                return StorePlugin.get(`${AUTH_USER_STORE_KEY_NAME}${email}`);
            }).then((res) => {
                delete res[key];
                return StorePlugin.set(`${AUTH_USER_STORE_KEY_NAME}${email}`, res);
            }).then(() => {
                resolve();
            }).catch(() => {
                if (!email)
                    return reject('用户未登录');
                reject('删除失败');
            })
        })
    },
};

export default {
    data,
    methods,
}
