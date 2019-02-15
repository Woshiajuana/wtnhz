
import Store                        from 'plugins/store.plugin'
import Modal                        from 'plugins/modal.plugin'
import Router                       from 'plugins/router.plugin'

const AUTH_KEY_NAME = 'AUTH_KEY_NAME';
const AUTH_USER_STORE_KEY_NAME = 'AUTH_USER_STORE_KEY_NAME';
const AUTH_USER_CACHE_KEY_NAME = 'AUTH_USER_CACHE_KEY_NAME';

const CRUX_KEY = 'email';

const get = () => Store.get(AUTH_KEY_NAME).catch(error => { throw '用户未登录'; });

const upt = (user) => {
    let data = {};
    return get(AUTH_KEY_NAME).then((res) => {
        data = Object.assign(data, res, user);
    }).catch(() => {
        data = user;
    }).finally(() => {
        return Store.set(AUTH_KEY_NAME, data);
    })
};

const exit = () => {
    return Promise.all([
        Store.remove(AUTH_KEY_NAME),
        Store.remove(AUTH_USER_CACHE_KEY_NAME),
    ]).then(() => {
        return Router.root();
    }).then(() => {
        let { bundleUrl } = weex.config;
        if (!bundleUrl) return;
        console.log(bundleUrl)
        let name = bundleUrl.substring(bundleUrl.lastIndexOf('wow'));
        if (['wow_app.js', 'wow_mine.js'].indexOf(name) === -1) return;
        console.log('登录', bundleUrl)
        login();
    }).then(() => {
        return Promise.resolve();
    }).catch((err) => {
        return Promise.reject('缓存清除失败');
    })
};

const login = () => {
    console.log(1);
    Modal.show('wow_user_login');
};

const _storageGet = (key, name) => {
    let crux = '';
    return get().then((res) => {
        crux = res[CRUX_KEY];
        return Store.get(`${name}${crux}`);
    }).then((res) => {
        let value = key ? res[key] : res;
        return Promise.resolve(value);
    }).catch((err) => {
        return Promise.reject(err);
    })
};

const _storageUpt = (key, value, name) => {
    let crux = '';
    let data = {};
    let err = {};
    return get().then((res) => {
        crux = res[CRUX_KEY];
        return Store.get(`${name}${crux}`);
    }).then((res) => {
        data = Object.assign(data, res);
    }).catch((e) => {
        err = e;
    }).finally(() => {
        if (!crux)
            return Promise.reject(err);
        if (typeof key === 'object') {
            data = Object.assign(data, key);
        } else {
            data[key] = value;
        }
        return Store.set(`${name}${crux}`, data);
    })
};

const _storageDel = (key, name) => {
    let crux = '';
    return get().then((res) => {
        crux = res[CRUX_KEY];
        let fun = 'get';
        if (!key) fun = 'remove';
        return Store[fun](`${name}${crux}`);
    }).then((res) => {
        if (!key)
            return Promise.resolve();
        delete res[key];
        return Store.set(`${name}${crux}`, res);
    }).catch((err) => {
        return Promise.reject(err);
    })
};


export default {

    // 获取用户信息
    get,

    // 设置用户信息
    upt,

    // 用户退出
    exit,

    // 用户去登录
    login,

    // 会话级边缓存
    cache: {
        set: (key) => _storageGet(key, AUTH_USER_CACHE_KEY_NAME),
        upt: (key, value) => _storageUpt(key, value, AUTH_USER_CACHE_KEY_NAME),
        del: (key) => _storageDel(key, AUTH_USER_CACHE_KEY_NAME),
    },

    // 存储
    store: {
        set: (key) => _storageGet(key, AUTH_USER_STORE_KEY_NAME),
        upt: (key, value) => _storageUpt(key, value, AUTH_USER_STORE_KEY_NAME),
        del: (key) => _storageDel(key, AUTH_USER_STORE_KEY_NAME),
    },
}


