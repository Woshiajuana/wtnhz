<template>
    <div class="wrap">
        <div class="head">
            <image class="user-head" src="https://img.mukewang.com/5c6d3e4e0001946418720632.jpg"></image>
            <div class="head-con">
                <text class="name">Woshiajuana</text>
                <text class="time">2019-02-28 16:11</text>
            </div>
        </div>
        <div class="center">
            <text class="title">javascripjavascript基础开发javascript基础开发t基础开发</text>
            <div class="type">
                <div class="type-item">
                    <text class="type-text">JS</text>
                </div>
            </div>
        </div>
        <div class="info">
            <div class="info-item">
                <image class="info-icon"></image>
                <text class="info-text">999</text>
            </div>
            <div class="info-item">
                <image class="info-icon"></image>
                <text class="info-text">999</text>
            </div>
            <div class="info-item">
                <image class="info-icon"></image>
                <text class="info-text">999</text>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    .wrap{
        background-color: #fff;
        margin-bottom: 10px;
    }
    .head{
        flex-direction: row;
        align-items: center;
        height: 120px;
        padding-left: 32px;
        padding-right: 32px;
    }
    .user-head{
        width: 80px;
        height: 80px;
        margin-right: 16px;
        border-radius: 60px;
    }
    .head-con{
        flex: 1;
    }
    .name{
        font-size: 32px;
        line-height: 50px;
        color: #333;
    }
    .time{
        font-size: 24px;
        line-height: 34px;
        color: #999;
    }
    .center{
        padding-left: 32px;
        padding-right: 32px;
        padding-top: 10px;
        padding-bottom: 30px;
    }
    .title{
        font-size: 28px;
        color: #333;
        line-height: 44px;
    }
    .type{
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 10px;
    }
    .type-item{
        height: 34px;
        align-items: center;
        justify-content: center;
        padding-left: 10px;
        padding-right: 10px;
        border-color: #dedede;
        border-width: 1px;
        border-radius: 8px;
    }
    .type-text{
        font-size: 20px;
        color: #999;
    }
    .info{
        flex-direction: row;
        align-items: center;
        height: 80px;
        /*border-top-width: 1px;*/
        /*border-top-color: #dedede;*/
        /*border-bottom-width: 1px;*/
        /*border-bottom-color: #dedede;*/
    }
    .info-item{
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 40px;
        /*background-color: #fff;*/
        /*border-right-width: 1px;*/
        /*border-color: #dedede;*/
    }
    .info-icon{

    }
    .info-text{

    }
</style>
