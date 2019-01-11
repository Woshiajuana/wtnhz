<template>
    <div class="wrap">
        <text class="title">{{title}}</text>
        <text class="title-sub">{{title_sub}}</text>
    </div>
</template>

<script>
    export default {
        props: {
            title: {default: ''},
            title_sub: {default: ''},
        }
    }
</script>

<style>
    .wrap{
        margin-top: 50px;
        width: 750px;
        margin-bottom: 50px;
        justify-content: center;
        height: 120px;
        padding-left: 55px;
    }
    .title{
        font-size: 42px;
        line-height: 56px;
        color: #333;
    }
    .title-sub{
        margin-top: 8px;
        font-size: 32px;
        line-height: 44px;
        color: #999;
    }
</style>
