import Router                   from 'plugins/router.plugin'
import AuthService              from 'services/auth.service'

const data = () => {
    return {
        params$: ''
    }
};

export const methods = {
    // 跳转URL页面
    routerPush (url, params = {}, callback) {
        let type = true;
        if (typeof callback === 'function') type = callback();
        if (callback === '') type = false;
        type
            ? Router.push(url, params)
            : AuthService.showLogin();
    },

    // 获取路由参数
    routerGetParams() {
        this.params$ = Router.getParams(this);
    }
};

export default {
    data,
    methods,
}
