<template>
    <cell>
        <div class="wrap">
            <image class="image" src="https://img.mukewang.com/5c6d3e4e0001946418720632.jpg"></image>
            <div class="inner">
                <div class="section">
                    <text class="label name">系统通知</text>
                    <text class="value time">2018-03-03</text>
                </div>
                <div class="section">
                    <text class="label prompt">哈哈哈哈哈啊哈哈哈哈</text>
                    <text class="value type">99</text>
                </div>
            </div>
        </div>
    </cell>
</template>

<script>
    export default {

    }
</script>

<style>
    .wrap{
        flex-direction: row;
        align-items: center;
        padding-left: 32px;
        padding-right: 32px;
        height: 140px;
        background-color: #fff;
        border-color: #dedede;
        border-bottom-width: 1px;
    }
    .wrap:active{
        background-color: #f2f2f2;
    }
    .image{
        width: 100px;
        height: 100px;
        border-radius: 100px;
        margin-right: 32px;
    }
    .inner{
        flex: 1;
    }
    .section{
        flex-direction: row;
        align-items: center;
    }
    .label{
        flex: 1;
    }
    .value{

    }
    .name{
        font-size: 32px;
        line-height: 50px;
        color: #333;
    }
    .time{
        font-size: 24px;
        color: #999;
    }
    .prompt{
        font-size: 28px;
        line-height: 44px;
        color: #666;
    }
    .type{
        padding-left: 10px;
        padding-right: 10px;
        font-size: 24px;
        color: #fff;
        line-height: 40px;
        border-radius: 40px;
        background-color: #fc5366;
    }
</style>
