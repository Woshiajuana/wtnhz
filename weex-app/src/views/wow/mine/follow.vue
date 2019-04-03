<template>
    <wow-view
        :view_style="{backgroundColor: '#f2f2f2'}"
        :view_header_center_txt="params$.title">
        <wow-scroll
            @refresh="handleRefresh"
            @loading="handleLoading">
            <cell class="cell"
                  v-for="(user, index) in arrList"
                  :key="index">
                <image class="avatar"></image>
                <div class="info">
                    <div class="top">
                        <text class="name">{{user.nickname || user.email}}</text>
                        <image
                            class="sex"
                            :src="user.sex === '0' ? src$.woman : src$.man"
                        ></image>
                    </div>
                    <div class="bottom">
                        <text class="autograph">{{user.autograph || '这个家伙什么都没留下~~~'}}</text>
                    </div>
                </div>
                <wow-arrow></wow-arrow>
            </cell>
        </wow-scroll>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowArrow                     from 'wow-weex-ui/lib/wow-arrow'
    import WowScroll                    from 'wow-weex-ui/lib/wow-scroll'
    import Api                          from 'config/api.config'
    import Http                         from 'plugins/http.plugin'
    import Dialogs                      from 'plugins/dialogs.plugin'
    import SourceMixin                  from 'mixins/source.mixin'
    import RouterMixin                  from 'mixins/router.mixin'

    const srcArr = [
        { key: 'def', value: 'default-head-icon.png?8', },
        { key: 'man', value: 'sex-man-icon.png', },
        { key: 'woman', value: 'sex-woman-icon.png', },
    ];

    export default {
        mixins: [
            RouterMixin,
            SourceMixin,
        ],
        data () {
            return {
                arrList: [],
                pageIndex: 1,
                pageSize: 10
            }
        },
        created () {
            this.sourceGet(srcArr);
            // 获取url参数
            this.routerGetParams();
        },
        methods: {
            handleRefresh (callback) {
                this.pageIndex = 1;
                this.reqThemeList(callback);
            },
            handleLoading (callback) {
                this.pageIndex++;
                this.reqThemeList(callback);
            },
            reqThemeList (callback) {
                let options = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                };
                Http(Api.reqThemeList, options, {
                    loading: !callback,
                    useToken: false,
                }).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    this.arrList = this.pageIndex === 1
                        ? data.list
                        : [...this.arrList, ...data.list];
                }).catch((err) => {
                    Dialogs.toast(err);
                }).finally(() => {
                    callback && callback();
                })
            },
        },
        components: {
            WowView,
            WowArrow,
            WowScroll,
        },
    }
</script>

<style>
    .wrap{
        margin-top: 20px;
        border-top-width: 1px;
        border-color: #dedede;
    }
    .avatar-wrap{
        margin-bottom: 20px;
    }
    .avatar{
        margin-right: 32px;
        margin-top: 20px;
        margin-bottom: 20px;
        width: 120px;
        height: 120px;
        border-radius: 120px;
    }
    .textarea-wrap{
        padding-left: 32px;
        padding-right: 32px;
        padding-bottom: 26px;
        border-bottom-width: 1px;
        border-color: #dedede;
        background-color: #fff;
    }
    .textarea-label{
        height: 100px;
        flex-direction: row;
        align-items: center;
    }
    .textarea-label-text{
        font-size: 32px;
        color: #333;
    }
    .textarea-value{
        flex: 1;
        height: 132px;
        font-size: 32px;
        color: #333;
        line-height: 44px;
    }
    .input-right{
        flex-direction: row;
        align-items: center;
    }
</style>
