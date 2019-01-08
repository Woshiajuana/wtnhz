
// 依赖混合 user.mixin.js
import StorePlugin                      from 'plugins/store.plugin'

const AUTH_USER_STORE_KEY_NAME = 'AUTH_USER_STORE_KEY_NAME';

const methods = {
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
                let value = key ? res[key] : res;
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
    methods,
}
