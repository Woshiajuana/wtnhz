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
                <image class="mask" :src="srcMask"></image>
                <div class="form">
                    <div class="input-box">
                        <text class="label">EMAIL</text>
                        <input class="input" type="text" placeholder="请输入" placeholder-color="#dedede"/>
                    </div>
                    <div class="input-box">
                        <text class="label">PASSWORD</text>
                        <input class="input" type="text" placeholder="请输入" placeholder-color="#dedede"/>
                    </div>
                    <wow-button
                        class="button"
                        button_txt="SIGN IN"
                    ></wow-button>
                    <div class="prompt">
                        <text class="prompt-text">DON'T HAVE AN ACCOUNT?</text>
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
    import Mixin                        from './login.mixin'

    const srcArr = [
        { key: 'banner', value: 'login-banner-2.png', },
        { key: 'mask', value: 'triangle-block.png', },
    ];

    export default {
        mixins: [Mixin, SourceMixin, WeexMixin],
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
        components: {
            WowView,
            WowButton,
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
    }
    .mask{
        width: 750px;
        height: 200px;
    }
    .input-box{
        margin-top: 30px;
        height: 120px;
        width: 640px;
        border-bottom-color: #ddd;
        border-bottom-width: 1px;
    }
    .label{
        height: 40px;
        font-size: 24px;
        color: #999;
        line-height: 40px;
    }
    .input{
        height: 80px;
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
</style>
