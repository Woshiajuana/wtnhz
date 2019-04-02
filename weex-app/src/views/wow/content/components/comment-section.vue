<template>
    <div class="wrap">
        <div class="head">
            <text class="title">全部评论</text>
        </div>
        <div class="main">
            <comment-cell
                v-for="(item, index) in data.list"
                :key="index"
                :data="item"
                :index="index"
                @popup="emitEvent('popup', $event)"
            ></comment-cell>
        </div>
        <div class="prompt"
             @appear="emitEvent('appear')"
             @disappear="emitEvent('disappear')">
            <text class='prompt-text'>{{computedPrompt}}</text>
        </div>
    </div>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowEnd                       from 'wow-weex-ui/lib/wow-end'
    import EmitMixin                    from 'mixins/emit.mixin'
    import CommentCell                  from './comment-cell.vue'

    export default {
        mixins: [
            EmitMixin,
        ],
        computed: {
            computedPrompt () {
                let { total, list } = this.data;
                if (!total || !list)
                    return '赶紧来抢个沙发吧...';
                return total === list.length
                    ? '没有更多了...'
                    : '正在加载...';
            }
        },
        props: {
            data: { default: {} },
        },
        components: {
            WowEnd,
            CommentCell,
        }
    }
</script>

<style>
    .wrap{
        width: 750px;
        background-color: #fff;
        margin-top: 20px;
    }
    .head{
        height: 80px;
        padding-left: 32px;
        flex-direction: row;
        align-items: center;
        border-color: #dedede;
        border-top-width: 1px;
        border-bottom-width: 1px;
    }
    .title{
        font-size: 28px;
        color: #333;
    }
    .main{

    }
    .prompt{
        height: 120px;
        align-items: center;
        justify-content: center;
        background-color: #f2f2f2;
    }
    .prompt-text{
        font-size: 24px;
        color: #999;
    }
</style>
