<template>
    <wow-view
        :view_style="{paddingTop: 0, backgroundColor: '#f2f2f2'}"
        :view_header_wrap_style="{backgroundColor: 'transparent'}">
        <div class="user">
            <image class="bg"></image>
            <div class="box">
                <image class="image"></image>
            </div>
            <div class="info">
                <text class="name">woshiajuana</text>
                <image class="sex" :src="src$.man"></image>
            </div>
        </div>
        <div class="main">
            <wow-input-cell
                v-for="(item, key) in arrEntry$"
                @click="routerPush(item.url)"
                :key="key"
                input_use_right=""
                :input_label_txt="item.label">
                <wow-arrow
                    slot="input-right"
                ></wow-arrow>
            </wow-input-cell>
        </div>
        <wow-button
            @click="handleExit"
            class="button"
            button_txt="安全退出"
        ></wow-button>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowArrow                     from 'wow-weex-ui/lib/wow-arrow'
    import WowButton                    from 'wow-weex-ui/lib/wow-button'
    import WowInputCell                 from 'wow-weex-ui/lib/wow-input-cell'
    import UserService                  from 'services/user.service'
    import SourceMixin                  from 'mixins/source.mixin'
    import InputMixin                   from 'mixins/input.mixin'
    import RouterMixin                  from 'mixins/router.mixin'
    import Mixin                        from './core.mixin'

    const srcArr = [
        { key: 'man', value: 'sex-man-icon.png', },
        { key: 'woman', value: 'sex-woman-icon.png', },
    ];

    export default {
        mixins: [
            Mixin,
            RouterMixin,
            SourceMixin,
            InputMixin,
        ],
        created () {
            this.sourceGet(srcArr);
        },
        methods: {
            handleExit (callback) {
                UserService.exit().finally(() => {callback();})
            },
            handleSelect () {

            },
        },
        components: {
            WowView,
            WowArrow,
            WowButton,
            WowInputCell,
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
    }

    .main{
        margin-top: 20px;
        flex: 1;
    }
    .button{
        margin-bottom: 80px;
    }
</style>
