
// 依赖混合 user.mixin.js
import StorePlugin                      from 'plugins/store.plugin'

const AUTH_USER_STORE_KEY_NAME = 'AUTH_USER_STORE_KEY_NAME';
const AUTH_USER_CACHE_KEY_NAME = 'AUTH_USER_CACHE_KEY_NAME';

const methods = {



    user$StoreSet (key, value, store_key = AUTH_USER_STORE_KEY_NAME) {
        let email = '';
        let data = {};
        return this.user$Get().then((info) => {
            email = info.email;
            return StorePlugin.get(`${store_key}${email}`);
        }).then((res) => {
            data = Object.assign(data, res);
            data[key] = value;
        }).catch(() => {
            data[key] = value;
        }).finally(() => {
            if (!email)
                return Promise.reject('用户未登录');
            return StorePlugin.set(`${store_key}${email}`);
        })
    },
    user$StoreGet (key, store_key = AUTH_USER_STORE_KEY_NAME) {
        let that = this;
        let email = '';
        return new Promise((resolve, reject) => {
            that.user$Get().then((info) => {
                email = info.email;
                return StorePlugin.get(`${store_key}${email}`);
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
    user$StoreDel (key, store_key = AUTH_USER_STORE_KEY_NAME) {
        let that = this;
        let email = '';
        return new Promise((resolve, reject) => {
            that.user$Get().then((info) => {
                email = info.email;
                let fun = 'get';
                if (!key) fun = 'remove';
                return StorePlugin[fun](`${store_key}${email}`);
            }).then((res) => {
                if (!key) return resolve();
                delete res[key];
                return StorePlugin.set(`${store_key}${email}`, res);
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
