<template>
    <div class="wrap">
        <div class="user">
            <image class="image"></image>
            <div class="info">
                <div class="top">
                    <text class="name">我心有猛虎</text>
                </div>
                <div class="bottom">
                    <text class="prompt number">第1楼</text>
                    <div class="bar"><div class="bar-inner"></div></div>
                    <text class="prompt">2019-03-05</text>
                    <div class="bar"><div class="bar-inner"></div></div>
                    <text class="prompt">上海市浦东新区</text>
                </div>
            </div>
        </div>
        <div class="content">
            <text class="text">哈哈 我心有猛虎我心有猛虎我心有猛虎我心有猛虎</text>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    .wrap{
        padding-left: 32px;
        padding-right: 32px;
        border-color: #f2f2f2;
        border-bottom-width: 1px;
        padding-top: 32px;
        padding-bottom: 32px;
    }
    .user{
        flex-direction: row;
        align-items: center;
    }
    .image{
        width: 80px;
        height: 80px;
        margin-right: 16px;
        border-radius: 80px;
        background-color: #f2f2f2;
        border-color: #dedede;
        border-width: 1px;
    }
    .info{

    }
    .top{
        flex-direction: row;
        align-items: center;
    }
    .name{
        font-size: 28px;
        color: #333;
        line-height: 40px;
    }
    .bottom{
        margin-top: 8px;
        flex-direction: row;
        align-items: center;
    }
    .prompt{
        font-size: 24px;
        line-height: 34px;
        color: #999;
        height: 34px;
    }
    .content{
        margin-top: 16px;
        padding-left: 96px;
    }
    .text{
        font-size: 32px;
        color: #333;
        line-height: 44px;
    }
    .bar{
        width: 32px;
        justify-content: center;
        align-items: center;
    }
    .bar-inner{
        height: 20px;
        width: 1px;
        background-color: #999;
    }
</style>
