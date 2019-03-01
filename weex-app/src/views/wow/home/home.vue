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
                v-for="(item, index) in arrList"
                :key="index"
            ></item-cell>
        </wow-scroll>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowScroll                    from 'wow-weex-ui/lib/wow-scroll'
    import SourceMixin                  from 'mixins/source.mixin'
    import HeadSection                  from './components/head-section.vue'
    import ItemCell                     from './components/item-cell.vue'

    const srcArr = [
        { key: 'arrow', value: 'triangle-down-ffffff-icon.png', },
        { key: 'search', value: 'search-icon-ffffff.png', },
    ];

    export default {
        mixins: [
            SourceMixin,
        ],
        data () {
            return {
                arrList: 10,
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
    .list{
        flex: 1;
    }
</style>
