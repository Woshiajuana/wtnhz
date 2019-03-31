<template>
    <wow-view
        view_use_scroll=""
        :view_style="{backgroundColor: '#f2f2f2'}"
        :view_header_wrap_style="{borderBottomWidth: 1}"
        view_header_center_txt="选择主题">
        <wow-scroll
            @refresh="handleRefresh"
            @loading="handleLoading">
            <cell>
                <wow-input-cell
                    v-for="(item, index) in arrList"
                    :key="index"
                    input_use_right=""
                ></wow-input-cell>
            </cell>
        </wow-scroll>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowArrow                     from 'wow-weex-ui/lib/wow-arrow'
    import WowInputCell                 from 'wow-weex-ui/lib/wow-input-cell'
    import WowScroll                    from 'wow-weex-ui/lib/wow-scroll'
    import SourceMixin                  from 'mixins/source.mixin'
    import InputMixin                   from 'mixins/input.mixin'
    import Mixin                        from './publish.mixin'

    const srcArr = [
        { key: 'close', value: 'header-left-close.png?6', },
    ];

    export default {
        mixins: [
            Mixin,
            InputMixin,
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
            WowArrow,
            WowInputCell,
            WowScroll,
        },
    }
</script>

<style>
    .input-box{
        margin-top: 30px;
        margin-right: 32px;
        margin-left: 32px;
        border-bottom-width: 1px;
        border-color: #f2f2f2;
        flex-direction: row;
        align-items: center;
    }
    .input{
        flex: 1;
        height: 90px;
        font-size: 28px;
        color: #333;
        line-height: 90px;
    }
    .input-placeholder{
        color: #dedede;
    }
    .content{
        flex: 1;
        font-size: 28px;
        color: #333;
        line-height: 1.5;
        height: 300px;
    }
    .textarea-box{
        border-bottom-width: 0;
    }
</style>
