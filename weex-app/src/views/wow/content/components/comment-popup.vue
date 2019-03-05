<template>
    <div class="wrap" @click="emitEvent('close')">
        <div class="inner"
             ref="inner"
             @click="emitEvent('null')">
            <div class="head">
                <image
                    class="close"
                    @click="emitEvent('close')"
                    :src="src$.close"
                ></image>
                <text class="title">5条回复</text>
            </div>
            <scroller class="main">
                <div class="cell">
                    <text class="text name">哈哈哈：</text>
                    <text class="text">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</text>
                </div>
                <div class="cell">
                    <text class="text name">哈哈哈：</text>
                    <text class="text">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</text>
                </div>
                <div class="cell">
                    <text class="text name">哈哈哈：</text>
                    <text class="text">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</text>
                </div>
                <div class="cell">
                    <text class="text name">哈哈哈：</text>
                    <text class="text">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</text>
                </div>
                <div class="cell">
                    <text class="text name">哈哈哈：</text>
                    <text class="text">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</text>
                </div>
                <div class="cell">
                    <text class="text name">哈哈哈：</text>
                    <text class="text">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</text>
                </div>
                <div class="cell">
                    <text class="text name">哈哈哈：</text>
                    <text class="text">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</text>
                </div>
                <div class="cell">
                    <text class="text name">哈哈哈：</text>
                    <text class="text">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</text>
                </div>

                <div class="cell">
                    <text class="text name">哈哈哈：</text>
                    <text class="text">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</text>
                </div>
                <div class="cell">
                    <text class="text name">哈哈哈：</text>
                    <text class="text">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</text>
                </div>
                <div class="prompt">
                    <text class="prompt-text">没有更多了</text>
                </div>
            </scroller>
            <operation-panel
                use_more=""
            ></operation-panel>
        </div>
    </div>
</template>

<script>
    import OperationPanel               from './operation-panel.vue'
    import EmitMixin                    from 'mixins/emit.mixin'
    import SourceMixin                  from 'mixins/source.mixin'
    import AnimationMixin               from 'mixins/animation.mixin'

    const srcArr = [
        { key: 'close', value: 'header-left-close.png', },
    ];

    export default {
        mixins: [
            EmitMixin,
            SourceMixin,
            AnimationMixin,
        ],
        created () {
            this.sourceGet(srcArr);
        },
        mounted () {
            this.animationRun(this.$refs.inner);
        },
        components: {
            OperationPanel,
        },
    }
</script>

<style>
    .wrap{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 750px;
        background-color: rgba(0, 0, 0, .3);
        justify-content: flex-end;
        align-items: center;
    }
    .inner{
        background-color: #fff;
        width: 750px;
        height: 1200px;
        transform: translate(0, 1200px);
    }
    .head{
        height: 90px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-color: #dedede;
        border-bottom-width: 1px;
    }
    .close{
        position: absolute;
        left: 32px;
        width: 48px;
        height: 48px;
        top: 21px;
        justify-content: center;
        align-items: center;
    }
    .title{
        font-size: 36px;
        color: #333;
    }
    .main{
        flex: 1;
    }
    .cell{
        padding-left: 32px;
        padding-right: 32px;
        margin-top: 20px;
    }
    .text{
        font-size: 32px;
        color: #333;
        line-height: 44px;
    }
    .name{
        color: #50b9fe;
    }
    .prompt{
        margin-top: 20px;
        border-top-width: 1px;
        border-color: #f2f2f2;
        height: 120px;
        align-items: center;
        justify-content: center;
    }
    .prompt-text{
        font-size: 24px;
        color: #999;
    }
</style>
