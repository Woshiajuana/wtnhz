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
                arrList: [
                    {
                        title: '基础开发基础开发基础开发基础开发基础开发基础开发基础开发基础开发',
                        time: '2019-02-28 16:11',
                        type: ['JS', 'HTML', 'CSS'],
                        praise: 999,
                        comment: 999,
                        collect: 999,
                        author: {
                            name: 'Woshiajuana',
                            avatar: 'https://img.mukewang.com/5c6d3e4e0001946418720632.jpg',
                        }
                    }
                ],
            }
        },
        created () {
            this.sourceGet(srcArr);
        },
        methods: {
            handleRefresh (callback) {
                this.arrList = 10;
                callback && callback();
            },
            handleLoading (callback) {
                this.arrList += 10;
                callback && callback();
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
