import Http                         from 'plugins/http.plugin'

export default {

    // 登录
    doUserLogin (data = {}) {
        return Http('/app/user/login', data)
    }

}
