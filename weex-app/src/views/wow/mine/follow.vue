<template>
    <wow-view
        view_use_scroll=""
        :view_style="{backgroundColor: '#f2f2f2'}"
        :view_header_wrap_style="{borderBottomWidth: 1}"
        :view_header_center_txt="params$.title">
        <wow-scroll
            @refresh="handleRefresh"
            @loading="handleLoading">
            <cell class="cell"
                  v-for="(user, index) in arrList"
                  :key="index">
                <image class="avatar" :src="user.avatar"></image>
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
            // 获取数据
            this.handleRefresh();
        },
        methods: {
            handleRefresh (callback) {
                this.pageIndex = 1;
                this.reqFollowList(callback);
            },
            handleLoading (callback) {
                this.pageIndex++;
                this.reqFollowList(callback);
            },
            reqFollowList (callback) {
                let options = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                };
                let {
                    type,
                } = this.params$;
                let url = type === 'wdgz'
                    ? Api.reqFollowingList
                    : Api.reqFollowersList;
                let key = type === 'wdgz'
                    ? 'following'
                    : 'follower';
                Http(url, options, {
                    loading: !callback,
                }).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    let arr = [];
                    data.list.forEach((item) => {
                        arr.push(item[key])
                    });
                    this.arrList = this.pageIndex === 1
                        ? arr
                        : [...this.arrList, ...arr];
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
    .cell{
        padding-top: 32px;
        padding-bottom: 32px;
        padding-left: 32px;
        padding-right: 32px;
        flex-direction: row;
        align-items: center;
        background-color: #fff;
    }
    .cell:active{
        background-color: #fcfcfc;
    }
    .avatar{
        width: 120px;
        height: 120px;
        margin-right: 32px;
        border-radius: 120px;
    }
    .info{
        flex: 1;
    }
    .top{
        flex-direction: row;
        align-items: center;
        height: 60px;
    }
    .name{
        font-size: 36px;
        color: #333;
        margin-right: 16px;
    }
    .sex{
        width: 30px;
        height: 30px;
    }
    .bottom{
        height: 44px;
        flex-direction: row;
        align-items: center;
    }
    .autograph{
        color: #999;
        font-size: 24px;
    }
</style>
