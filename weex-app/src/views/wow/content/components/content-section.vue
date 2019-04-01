<template>
    <div class="wrap">
        <text class="text">{{data}}</text>
    </div>
</template>

<script>
    export default {
        props: { data: { default: ''} }
    }
</script>

<style>
    .wrap{
        padding-left: 32px;
        padding-right: 32px;
        padding-bottom: 32px;
        background-color: #fff;
        border-bottom-width: 1px;
        border-color: #dedede;
    }
    .text{
        line-height: 44px;
        font-size: 28px;
        color: #333;
    }
</style>
