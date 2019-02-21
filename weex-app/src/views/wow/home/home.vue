<template>
    <wow-view
        view_use_scroll=""
        view_use_header=""
        view_header_left_src="">
        <head-section
            slot="view-header"
        ></head-section>
        <scroller class="list">
            <item-cell></item-cell>
            <item-cell></item-cell>
            <item-cell></item-cell>
            <item-cell></item-cell>
        </scroller>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
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
        created () {
            this.sourceGet(srcArr);
        },
        components: {
            WowView,
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
