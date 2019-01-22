<template>
    <wow-view view_header_left_src="">
        <div class="wrap">
            <div class="portrait-box">
                <image
                    class="portrait"
                    :src="avatar || src$.def"
                ></image>
            </div>
            <div class="form">
                <div v-for="(item, key) in objInput$"
                     :key="key">
                    <input-box
                        v-if="item.display !== false"
                        class="input-box"
                        :input_label="item.label"
                        :input_value="item.value"
                        :input_type="item.type"
                        :input_placeholder="item.placeholder"
                        @input="handleInput(item, $event)">
                        <image
                            @click="handleRefresh(item)"
                            class="captcha"
                            v-if="key === 'captcha'"
                            autoBitmapRecycle="false"
                            :src="item.captcha"
                        ></image>
                    </input-box>
                </div>
                <div class="prompt prompt-left"
                     @click="routerPush('wow_user_forgot', {email: objInput$.email.value})">
                    <text class="prompt-text">忘记密码?</text>
                </div>
                <wow-button
                    @click="handleSubmit"
                    :button_disabled="computedDisabled"
                    :button_style="{marginLeft: 0, marginTop: 100}"
                    button_txt="登录"
                ></wow-button>
                <div class="prompt" @click="routerPush('wow_user_register')">
                    <text class="prompt-text">还没有帐号 ?</text>
                    <text class="prompt-link">去注册</text>
                </div>
            </div>
        </div>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowButton                    from 'wow-weex-ui/lib/wow-button'
    import SourceMixin                  from 'mixins/source.mixin'
    import WeexMixin                    from 'mixins/weex.mixin'
    import InputMixin                   from 'mixins/input.mixin'
    import RouterMixin                  from 'mixins/router.mixin'
    import Dialogs                      from 'plugins/dialogs.plugin'
    import Modal                        from 'plugins/modal.plugin'
    import Router                       from 'plugins/router.plugin'
    import Api                          from 'config/api.config'
    import Http                         from 'plugins/http.plugin'
    import Store                        from 'plugins/store.plugin'
    import VerifyUtil                   from 'utils/verify.util'
    import ExtractUtil                  from 'utils/extract.util'
    import UserService                  from 'services/user.service'
    import Mixin                        from './login.mixin'
    import InputBox                     from './components/input-box.vue'

    const srcArr = [
        { key: 'def', value: 'default-head-icon.png?8', },
    ];

    export default {
        mixins: [
            Mixin,
            SourceMixin,
            WeexMixin,
            InputMixin,
            RouterMixin,
        ],
        data () {
            return {
                avatar: '',
            }
        },
        computed: {
            computedDisabled () {
                let result = VerifyUtil.multiple(this.objInput$, 'nonempty');
                return result;
            },
        },
        created () {
            this.weexGet();
            this.sourceGet(srcArr);
        },
        methods: {
            // 登录
            handleSubmit (callback) {
                if (VerifyUtil.multiple(this.objInput$))
                    return callback();
                let options = ExtractUtil.input(this.objInput$);
                Http(Api.doUserLogin, options, { auth: false }).then(({code, data, msg}) => {
                    if (code === '1001') {
                        this.objInput$.captcha.display = true;
                        this.objInput$.captcha.captcha = `data:image/png;base64,${data}`;
                        throw msg;
                    }
                    if (code !== '0000')
                        throw msg;
                    Store.set(`${data.email}_avatar`, data.avatar);
                    return UserService.upt(data);
                }).then(() => {
                    Dialogs.toast('登录成功');
                    return Modal.close();
                }).then(() => {
                    return Router.root();
                }).catch((err) => {
                    Dialogs.toast(err);
                }).finally(() => {
                    callback();
                });
            },
            // 刷新图形验证码
            handleRefresh (item) {
                if (VerifyUtil.single(this.objInput$.email))
                    return null;
                let options = ExtractUtil.input(this.objInput$);
                Http(Api.doRefreshCaptcha, options, { auth: false }).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    item.display = true;
                    item.captcha = `data:image/png;base64,${data}`;
                }).catch((err) => {
                    Dialogs.toast(err);
                });
            },
            // 输入框验证
            inputCallback (item, event) {
                if (item.label !== '邮箱')
                    return null;
                this.objInput$.captcha.display = false;
                this.objInput$.captcha.captcha = '';
                Store.get(`${event}_avatar`).then((res) => {
                    this.avatar = res;
                }).catch(() => {
                    this.avatar = '';
                })
            },
        },
        components: {
            WowView,
            WowButton,
            InputBox,
        },
    }
</script>

<style>
    .wrap{
        width: 750px;
        align-items: center;
        margin-top: 20px;
    }
    .portrait-box{
        width: 220px;
        height: 220px;
        border-radius: 220px;
        border-width: 10px;
        border-color: #f2f2f2;
        justify-content: center;
        align-items: center;
        background-color: #dedede;
        margin-top: 20px;
        margin-bottom: 50px;
    }
    .portrait{
        width: 200px;
        height: 200px;
        border-radius: 200px;
    }
    .form{
        flex: 1;
        background-color: #fff;
        padding-left: 55px;
        padding-right: 55px;
        justify-content: flex-end;
    }
    .input-box{
        margin-top: 30px;
    }
    .captcha{
        height: 60px;
        width: 160px;
    }
    .prompt{
        height: 120px;
        align-items: center;
        justify-content: center;
        flex-direction: row;
    }
    .prompt-text{
        color: #999;
        font-size: 26px;
    }
    .prompt-link{
        color: #333;
        font-size: 26px;
        margin-left: 20px;
    }
    .prompt-left{
        height: 80px;
        line-height: 80px;
        justify-content: flex-end;
    }
</style>
