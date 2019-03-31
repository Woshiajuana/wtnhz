<template>
    <wow-view
        view_use_scroll=""
        :view_header_left_src="src$.close">
        <div class="input-box">
            <input
                type="text"
                class="input"
                placeholder-color="#dedede"
                placeholder="加个标题呦..."
            />
        </div>
        <div class="input-box">
            <text class="input input-placeholder">别忘了选择主题...</text>
            <wow-arrow></wow-arrow>
        </div>
        <scroller class="inner">
            <textarea
                class="content"
                placeholder-color="#dedede"
                placeholder="来吧，尽情的发挥吧..."
            ></textarea>
        </scroller>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowArrow                     from 'wow-weex-ui/lib/wow-arrow'
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
        created () {
            this.sourceGet(srcArr);
        },
        components: {
            WowView,
            WowArrow,
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
    .inner{
        flex: 1;
        padding-left: 32px;
        padding-right: 32px;
        margin-top: 30px;
    }
    .content{
        font-size: 28px;
        color: #333;
        line-height: 1.5;
        height: 300px;
        background-color: #f2f2f2;
    }
</style>
