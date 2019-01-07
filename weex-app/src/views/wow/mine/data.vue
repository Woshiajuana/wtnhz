<template>
    <wow-view
        view_header_right_txt="安全退出"
        :view_header_right_txt_style="{color: '#fc5366'}"
        :view_header_style="{backgroundColor: 'transparent'}">
        <div class="user">
            <image class="bg"></image>
            <div class="box">
                <image class="image"></image>
            </div>
            <div class="info">
                <text class="name">woshiajuana</text>
                <image class="sex"></image>
            </div>
        </div>

    </wow-view>
</template>

<script>
    import WowView                      from 'components/wow-weex-ui/lib/wow-view'
    import SourceMixin                  from 'mixins/source.mixin'

    const srcArr = [
        { key: 'set', value: 'set-icon.png', },
    ];

    export default {
        mixins: [
            SourceMixin,
        ],
        created () {
            this.sourceGet(srcArr);
        },
        components: {
            WowView,
        },
    }
</script>

<style>
    .user{
        height: 375px;
        justify-content: center;
        align-items: center;
    }
    .bg{
        position: absolute;
        left: 0;
        top: 0;
        margin-top: -375px;
        width: 750px;
        height: 750px;
        background-color: #333333;
    }
    .box{
        width: 130px;
        height: 130px;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 130px;
    }
    .image{
        width: 125px;
        height: 125px;
        border-radius: 125px;
        background-color: red;
    }
    .info{
        margin-top: 20px;
        flex-direction: row;
        align-items: center;
    }
    .name{
        font-size: 36px;
        color: #fff;
        margin-right: 10px;
    }
    .sex{
        width: 30px;
        height: 30px;
        background-color: red;
    }
</style>
