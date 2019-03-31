<template>
    <wow-view
        view_use_scroll=""
        view_use_header=""
        :view_style="{backgroundColor: '#f2f2f2'}"
        view_header_left_src="">
        <head-section
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
        <div class="publish"
             @click="routerPush('wow_publish', item)">
            <image
                class="icon"
                :src="src$.publish"
            ></image>
        </div>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowScroll                    from 'wow-weex-ui/lib/wow-scroll'
    import SourceMixin                  from 'mixins/source.mixin'
    import RouterMixin                  from 'mixins/router.mixin'
    import Http                         from 'plugins/http.plugin'
    import Dialogs                      from 'plugins/dialogs.plugin'
    import Router                       from 'plugins/router.plugin'
    import Api                          from 'config/api.config'
    import HeadSection                  from './components/head-section.vue'
    import ItemCell                     from './components/item-cell.vue'

    const srcArr = [
        { key: 'arrow', value: 'triangle-down-ffffff-icon.png', },
        { key: 'search', value: 'search-icon-ffffff.png', },
        { key: 'publish', value: 'publish-icon-fc5366.png', },
    ];

    export default {
        mixins: [
            SourceMixin,
            RouterMixin,
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
            this.reqPostList();
        },
        methods: {
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
            WowScroll,
            ItemCell,
            HeadSection,
        },
    }
</script>

<style>
    .publish{
        position: fixed;
        right: 32px;
        bottom: 32px;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        border-radius: 60px;
        background-color: #fff;
        border-color: #fc5366;
        border-width: 2px;
    }
    .publish:active{
        background-color: #f2f2f2;
    }
    .icon{
        width: 30px;
        height: 30px;
    }
</style>
