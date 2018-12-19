<template>
    <wow-view
        view_use_header="">
        <div class="head">
            <image class="banner" :src="src$.banner"></image>
            <div class="mask"></div>
            <div class="portrait-box">
                <image class="portrait" :src="src$.banner"></image>
            </div>
        </div>
        <div class="form">
            <div class="input-box">
                <text class="label">EMAIL</text>
                <input class="input" type="text" placeholder="请输入"/>
            </div>
            <div class="input-box">
                <text class="label">PASSWORD</text>
                <input class="input" type="text" placeholder="请输入"/>
            </div>
            <wow-button
                button_txt="SIGN IN"
            ></wow-button>
        </div>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowButton                    from 'wow-weex-ui/lib/wow-button'
    import SourceMixin                  from 'mixins/source.mixin'

    const srcArr = [
        { key: 'banner', value: 'login-banner-1.jpg', },
    ];

    export default {
        mixins: [SourceMixin],
        created () {
            this.sourceGet(srcArr);
        },
        components: {
            WowView,
            WowButton,
        },
    }
</script>

<style>
    .head{

    }
    .banner{

    }
    .mask{

    }
    .portrait-box{

    }
    .portrait{

    }
    .form{

    }
    .input-box{

    }
    .label{

    }
    .input{

    }
</style>
