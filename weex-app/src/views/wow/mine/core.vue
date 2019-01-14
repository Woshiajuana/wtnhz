<template>
    <wow-view
        @viewappear="handleViewAppear"
        :view_style="{paddingTop: 0, backgroundColor: '#f2f2f2'}"
        :view_header_wrap_style="{backgroundColor: 'transparent'}">
        <div class="user">
            <image class="bg" :src="user$.avatar"></image>
            <div class="mask"></div>
            <div class="box">
                <image class="image" :src="user$.avatar || src$.def"></image>
            </div>
            <div class="info">
                <text class="name">{{user$.nickname}}</text>
                <image class="sex" :src="user$.sex === '0' ? src$.woman : src$.man"></image>
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
    import UserMixin                    from 'mixins/user.mixin'
    import Mixin                        from './core.mixin'

    const srcArr = [
        { key: 'def', value: 'default-head-icon.png?8', },
        { key: 'man', value: 'sex-man-icon.png', },
        { key: 'woman', value: 'sex-woman-icon.png', },
    ];

    export default {
        mixins: [
            Mixin,
            UserMixin,
            RouterMixin,
            SourceMixin,
            InputMixin,
        ],
        created () {
            this.sourceGet(srcArr);
        },
        methods: {
            handleViewAppear () {
                this.userGet();
            },
            handleExit (callback) {
                UserService.exit().finally(() => {callback();})
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
        margin-top: -187px;
        width: 750px;
        height: 750px;
    }
    .mask{
        position: absolute;
        width: 750px;
        height: 375px;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.5);
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
        height: 44px;
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
