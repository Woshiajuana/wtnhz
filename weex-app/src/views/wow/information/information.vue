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
    import ItemCell                     from './components/item-cell.vue'

    export default {
        data () {
            return {
                arrList: 10,
            }
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
        },
    }
</script>

<style>

</style>
