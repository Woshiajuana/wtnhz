<template>
    <wow-view
        view_use_scroll=""
        view_header_left_src=""
        :view_style="{backgroundColor: '#f2f2f2'}"
        :view_header_wrap_style="{backgroundColor: '#fc5366'}"
        :view_header_center_txt_style="{color: '#fff'}"
        view_header_center_txt="消息">
        <wow-scroll
            @refresh="handleRefresh"
            @loading="handleLoading">
            <item-cell></item-cell>
            <item-cell></item-cell>
            <item-cell></item-cell>
            <item-cell></item-cell>
            <item-cell></item-cell>
            <item-cell></item-cell>
            <item-cell></item-cell>
            <item-cell></item-cell>
            <item-cell></item-cell>
        </wow-scroll>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowScroll                    from 'wow-weex-ui/lib/wow-scroll'
    import ItemCell                     from './components/item-cell.vue'

    export default {
        methods: {
            handleRefresh (callback) {
                callback && callback();
            },
            handleLoading (callback) {
                callback && callback();
            },
        },
        components: {
            WowView,
            WowScroll,
            ItemCell,
        },
    }
</script>

<style>

</style>
