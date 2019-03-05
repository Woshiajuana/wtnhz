<template>
    <div class="wrap">
        <div class="head">
            <text class="title">全部评论</text>
        </div>
        <div class="main">
            <comment-cell></comment-cell>
            <comment-cell></comment-cell>
            <comment-cell></comment-cell>
            <comment-cell></comment-cell>
            <comment-cell></comment-cell>
        </div>
    </div>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import CommentCell                  from './comment-cell.vue'
    export default {
        components: {
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
</style>
