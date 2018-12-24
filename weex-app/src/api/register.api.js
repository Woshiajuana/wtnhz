import Http                         from 'plugins/http.plugin'

export default {

    // 注册
    doUserRegister (data = {}) {
        return Http('/app/user/register', data)
    },

    // 验证码
    doFetchVerifyCode (data = {}) {
        return Http('/app/user/code', data)
    }
}
