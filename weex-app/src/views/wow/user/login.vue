<template>
    <wow-view
        :view_style="{paddingTop: 0}"
        view_use_header="">
        <div class="wrap"
             :style="{ height: height$ }">
            <div class="inner"
                 ref="inner"
                 :style="{ height: height$ * 0.8 }">
                <image
                    class="mask"
                    autoBitmapRecycle="false"
                    :src="srcMask"
                ></image>
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
                    <div class="prompt prompt-left">
                        <text class="prompt-text">忘记密码?</text>
                    </div>
                    <wow-button
                        @click="handleSubmit"
                        :button_disabled="computedDisabled"
                        class="button"
                        :button_style="{marginLeft: 0, marginTop: 100}"
                        button_txt="登录"
                    ></wow-button>
                    <div class="prompt" @click="routerPush('wow_user_register')">
                        <text class="prompt-text">还没有帐号 ?</text>
                        <text class="prompt-link">去注册</text>
                    </div>
                </div>
                <div class="portrait-box">
                    <image class="portrait" :src="src$.banner"></image>
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
    import Animation                    from 'plugins/animation.plugin'
    import Dialogs                      from 'plugins/dialogs.plugin'
    import Modal                        from 'plugins/modal.plugin'
    import Router                       from 'plugins/router.plugin'
    import Api                          from 'api/login.api'
    import Http                         from 'plugins/http.plugin'
    import VerifyUtil                   from 'utils/verify.util'
    import ExtractUtil                  from 'utils/extract.util'
    import UserService                  from 'services/user.service'
    import Mixin                        from './login.mixin'
    import InputBox                     from './components/input-box.vue'

    const srcArr = [
        { key: 'banner', value: 'login-banner-2.png', },
        { key: 'mask', value: 'triangle-block.png', },
    ];

    export default {
        mixins: [
            Mixin,
            SourceMixin,
            WeexMixin,
            InputMixin,
            RouterMixin,
        ],
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
        mounted () {
            this.animationRun();
        },
        methods: {
            // 登录
            handleSubmit (callback) {
                if (VerifyUtil.multiple(this.objInput$))
                    return callback();
                let options = ExtractUtil.input(this.objInput$);
                Http(Api.doUserLogin, options).then(({code, data, msg}) => {
                    if (code === '1001') {
                        this.objInput$.captcha.display = true;
                        this.objInput$.captcha.captcha = `data:image/png;base64,${data}`;
                        throw msg;
                    }
                    if (code !== '0000')
                        throw msg;
                    return UserService.upt(data);
                }).then(() => {
                    Modal.close();
                    return Modal.close();
                }).then(() => {
                    Dialogs.toast('登录成功');
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
                Http(Api.doRefreshCaptcha, options).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    item.display = true;
                    item.captcha = `data:image/png;base64,${data}`;
                }).catch((err) => {
                    Dialogs.toast(err);
                });
            },
            // 输入框验证
            inputCallback (item) {
                if (item.label !== '邮箱')
                    return null;
                this.objInput$.captcha.display = false;
                this.objInput$.captcha.captcha = '';
            },
            animationRun () {
                Animation.run(this.$refs.inner, {
                    styles: {
                        opacity: '1',
                        transform: 'translate(0,0)',
                        transformOrigin: 'center center'
                    },
                    duration: 300,
                    timingFunction: 'ease-out',
                    delay: 0
                }).then(() => {});
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
        flex: 1;
        background-color: #fc5366;
    }
    .portrait-box{
        position: absolute;
        top: 0;
        margin-left: 275px;
        width: 220px;
        height: 220px;
        border-radius: 220px;
        border-width: 10px;
        border-color: #fff;
        justify-content: center;
        align-items: center;
        background-color: #dedede;
    }
    .portrait{
        width: 200px;
        height: 200px;
        border-radius: 200px;
    }
    .inner{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 750px;
        flex-direction: column;
        justify-content: flex-end;
        transform: translate(0, 600px);
        opacity: 0;
    }
    .form{
        flex: 1;
        background-color: #fff;
        padding-left: 55px;
        padding-right: 55px;
        justify-content: flex-end;
    }
    .mask{
        width: 750px;
        height: 200px;
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
        height: 60px;
        line-height: 60px;
        justify-content: flex-end;
    }
</style>
