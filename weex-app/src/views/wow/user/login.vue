<template>
    <wow-view
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
                    <input-box
                        v-for="(item, key) in objInput$"
                        :key="key"
                        class="input-box"
                        :input_label="item.label"
                        :input_value="item.value"
                        :input_type="item.type"
                        :input_placeholder="item.placeholder"
                        @input="handleInput(item, $event)"
                    ></input-box>
                    <div class="prompt prompt-left">
                        <text class="prompt-text">Forgot Password ?</text>
                    </div>
                    <wow-button
                        @click="handleSubmit"
                        :button_disabled="computedDisabled"
                        class="button"
                        :button_style="{marginLeft: 0, marginTop: 100}"
                        button_txt="SIGN IN"
                    ></wow-button>
                    <div class="prompt" @click="routerPush('wow_user_register')">
                        <text class="prompt-text">DON'T HAVE AN ACCOUNT ?</text>
                        <text class="prompt-link">SIGN UP</text>
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
    import Api                          from 'api/login.api'
    import VerifyUtil                   from 'utils/verify.util'
    import ExtractUtil                  from 'utils/extract.util'
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
        data () {
            return {
                email: '',
                password: '',
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
        mounted () {
            this.animationRun();
        },
        methods: {
            // 提交
            handleSubmit (callback) {
                if (VerifyUtil.multiple(this.objInput$))
                    return callback();
                let options = ExtractUtil.input(this.objInput$);
                Api.doUserLogin(options).then((res) => {
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                }).finally(() => {
                    callback();
                });
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
                }).then(() => {
                    console.log('成功')
                });
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
