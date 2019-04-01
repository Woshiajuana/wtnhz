<template>
    <wow-view
        @viewappear="handleViewAppear"
        view_use_scroll=""
        view_use_header=""
        :view_style="{backgroundColor: '#f2f2f2'}"
        view_header_left_src="">
        <head-section
            :user="user$"
            :theme="objTheme"
            slot="view-header"
        ></head-section>
        <wow-scroll
            @refresh="handleRefresh"
            @loading="handleLoading">
            <item-cell
                @click="routerPush('wow_content', item)"
                v-for="(item, index) in arrList"
                :key="index"
                :data="item"
            ></item-cell>
        </wow-scroll>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowScroll                    from 'wow-weex-ui/lib/wow-scroll'
    import SourceMixin                  from 'mixins/source.mixin'
    import RouterMixin                  from 'mixins/router.mixin'
    import UserMixin                    from 'mixins/user.mixin'
    import ChannelMixin                 from 'mixins/channel.mixin'
    import Http                         from 'plugins/http.plugin'
    import Dialogs                      from 'plugins/dialogs.plugin'
    import Router                       from 'plugins/router.plugin'
    import Api                          from 'config/api.config'
    import HeadSection                  from './components/head-section.vue'
    import ItemCell                     from './components/item-cell.vue'

    const srcArr = [
        { key: 'arrow', value: 'triangle-down-ffffff-icon.png', },
        { key: 'search', value: 'search-icon-ffffff.png', },
    ];

    export default {
        mixins: [
            UserMixin,
            SourceMixin,
            RouterMixin,
            ChannelMixin,
        ],
        data () {
            return {
                arrList: [],
                pageIndex: 1,
                pageSize: 10,
                objCondition: {},
                objTheme: { name: '全部' },
            }
        },
        created () {
            this.sourceGet(srcArr);
            this.handleRefresh(true);
            this.channelAdd(this.channel$.EVENT.$$HOME_THEME, this.channelThemeHandle.bind(this));
        },
        methods: {
            channelThemeHandle (item) {
                this.objTheme = item;
                this.objCondition = { theme: item._id };
            },
            handleViewAppear () {
                this.userGet();
            },
            handleRefresh (callback) {
                this.pageIndex = 1;
                this.reqPostList(callback);
            },
            handleLoading (callback) {
                this.pageIndex++;
                this.reqPostList(callback);
            },
            reqPostList (callback) {
                let options = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                };
                Http(Api.reqPostList, options, {
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
                    typeof callback === 'function' && callback();
                })
            },
        },
        components: {
            WowView,
            WowScroll,
            ItemCell,
            HeadSection,
        },
    }
</script>
