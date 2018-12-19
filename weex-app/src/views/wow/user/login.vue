<template>
    <wow-view
        view_use_header="">
        <div class="wrap"
             :style="computedStyle">
            <!--<image-->
                <!--class="background"-->
                <!--:src="src$.banner"-->
                <!--:style="computedStyle"-->
            <!--&gt;</image>-->


            <div class="inner">
                <image class="mask" autoBitmapRecycle="false" :src="srcMask"></image>
                <div class="form">
                    <input-box
                        class="input-box"
                        input_label="EMAIL"
                        :input_value="email"
                        @input="handleInput('email', $event)"
                        input_placeholder="Please Enter Email"
                    ></input-box>
                    <input-box
                        v-model="password"
                        class="input-box"
                        input_type="password"
                        input_label="PASSWORD"
                        :input_value="password"
                        @input="handleInput('password', $event)"
                        input_placeholder="Please Enter Password"
                    ></input-box>
                    <div class="prompt get-password">
                        <text class="prompt-link prompt-text">Forgot Password ?</text>
                    </div>
                    <wow-button
                        @click="handleClear"
                        class="button"
                        button_txt="SIGN IN"
                    ></wow-button>
                    <div class="prompt">
                        <text class="prompt-link prompt-text">DON'T HAVE AN ACCOUNT ?</text>
                        <text class="prompt-link">SIGN UP</text>
                    </div>
                </div>

                <!--<div class="portrait-box">-->
                    <!--<image class="portrait" :src="src$.banner"></image>-->
                <!--</div>-->

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
    import Mixin                        from './login.mixin'
    import InputBox                     from './components/input-box.vue'

    const srcArr = [
        { key: 'banner', value: 'login-banner-2.png', },
        { key: 'mask', value: 'triangle-block.png', },
    ];

    export default {
        mixins: [Mixin, SourceMixin, WeexMixin, InputMixin],
        data () {
            return {
                email: '',
                password: '',
            }
        },
        computed: {
            computedStyle () {
                let {
                    deviceWidth,
                    deviceHeight,
                } = this.weex$;
                let width = 750;
                let height = width / deviceWidth * deviceHeight;
                return {
                    height,
                };
            }
        },
        created () {
            this.weexGet(srcArr);
            this.sourceGet(srcArr);
        },
        methods: {
            handleClear (callback) {
                callback();
            }
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
        background-color: #333333;
    }
    .background{
        position: absolute;
        top: 0;
        left: 0;
    }
    .portrait-box{
        position: absolute;
        bottom: 0;
        margin-left: 275px;
        width: 200px;
        height: 200px;
        background-color: red;
    }
    .portrait{
        width: 200px;
        height: 200px;
    }


    .inner{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 750px;
        flex-direction: column;
        justify-content: flex-end;
        /*background-color: #fff;*/
    }
    .form{
        background-color: #fff;
        padding-left: 55px;
        padding-right: 55px;
    }
    .mask{
        width: 750px;
        height: 200px;
    }
    .input-box{
        margin-top: 30px;
    }
    .button{
        margin-top: 100px;
        margin-left: 0;
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
    .prompt-link:active{
        color: #000;
    }
    .get-password{
        height: 60px;
        line-height: 60px;
        justify-content: flex-end;
    }
</style>
