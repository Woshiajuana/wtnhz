<template>
    <wow-view
        view_header_center_txt="Sign Up">

        <div class="wrap">

            <input-box
                class="input-box"
                input_label="EMAIL"
                :input_value="email"
                @input="handleInput('email', $event)"
                input_placeholder="Please Enter Email"
            ></input-box>

            <input-box
                class="input-box"
                input_label="VERIFICATION CODE"
                :input_value="email"
                @input="handleInput('email', $event)"
                input_placeholder="Please Enter Verification Code"
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

            <input-box
                v-model="password"
                class="input-box"
                input_type="password"
                input_label="PASSWORD"
                :input_value="password"
                @input="handleInput('password', $event)"
                input_placeholder="Please Enter The Password Again"
            ></input-box>

            <div class="prompt">
                <wow-switch
                    :switch_value="false"
                    :switch_style="{ width: 50, height: 32 }"
                    :switch_inner_style="{ width: 28, height: 28 }"
                ></wow-switch>
                <text class="prompt-text">I have read and agreed</text>
                <text class="prompt-link">《Service Agreement》</text>
            </div>

            <wow-button
                @click="handleClear"
                class="button"
                button_txt="SIGN UP"
            ></wow-button>

        </div>

    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowButton                    from 'wow-weex-ui/lib/wow-button'
    import WowSwitch                    from 'wow-weex-ui/lib/wow-switch'
    import SourceMixin                  from 'mixins/source.mixin'
    import WeexMixin                    from 'mixins/weex.mixin'
    import InputMixin                   from 'mixins/input.mixin'
    import Animation                    from 'plugins/animation.plugin'
    import Router                       from 'plugins/router.plugin'
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
            computedWrapStyle () {
                let {
                    deviceWidth,
                    deviceHeight,
                } = this.weex$;
                let width = 750;
                let height = width / deviceWidth * deviceHeight;
                return {
                    height,
                };
            },
            computedInnerStyle () {
                let {
                    deviceWidth,
                    deviceHeight,
                } = this.weex$;
                let width = 750;
                let height = width / deviceWidth * deviceHeight * 0.8;
                return {
                    height,
                };
            },
        },
        created () {
            this.weexGet(srcArr);
            this.sourceGet(srcArr);
        },
        mounted () {
            this.animationRun();
        },
        methods: {
            handleClear (callback) {
                callback();
                Router.push('wow_user_login');
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
            WowSwitch,
        },
    }
</script>

<style>

    .wrap{
        justify-content: center;
        align-items: center;
    }
    .input-box{
        margin-top: 30px;
    }
    .button{
        margin-top: 100px;
        margin-left: 0;
    }
    .prompt{
        width: 640px;
        margin-top: 20px;
        align-items: center;
        flex-direction: row;
    }
    .prompt-text{
        color: #999;
        font-size: 26px;
        margin-left: 10px;
    }

    .prompt-link{
        color: #333;
        font-size: 26px;
        margin-left: 20px;
    }
</style>
