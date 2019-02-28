<template>
    <cell>
        <div class="wrap">
            <div class="head">
                <div class="user">
                    <image class="user-head" src="https://img.mukewang.com/5c6d3e4e0001946418720632.jpg"></image>
                    <div class="head-con">
                        <text class="name">Woshiajuana</text>
                        <text class="time">2019-02-28 16:11</text>
                    </div>
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
                    <image class="info-icon" :src="src$.give"></image>
                    <text class="info-text">999</text>
                </div>
                <div class="info-item">
                    <image class="info-icon" :src="src$.msg"></image>
                    <text class="info-text">999</text>
                </div>
                <div class="info-item">
                    <image class="info-icon" :src="src$.collect"></image>
                    <text class="info-text">999</text>
                </div>
            </div>
        </div>
    </cell>
</template>

<script>
    import SourceMixin                  from 'mixins/source.mixin'

    const srcArr = [
        { key: 'give_active', value: 'give-icon-fc5366.png', },
        { key: 'give', value: 'give-icon-999.png', },
        { key: 'collect', value: 'collect-icon-999.png', },
        { key: 'collect_active', value: 'collect-icon-fc5366.png', },
        { key: 'msg', value: 'msg-icon-999.png', },
        { key: 'search', value: 'search-icon-ffffff.png', },

    ];

    export default {
        mixins: [
            SourceMixin,
        ],
        created () {
            this.sourceGet(srcArr);
        },
    }
</script>

<style>
    .wrap{
        background-color: #fff;
        margin-bottom: 10px;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-color: #dedede;
    }
    .head{
        flex-direction: row;
        align-items: center;
        padding-left: 32px;
        padding-right: 32px;
    }
    .user{
        flex-direction: row;
        align-items: center;
        height: 120px;
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
    .center:active{
        background-color: #f2f2f2;
    }
    .title{
        font-size: 32px;
        color: #333;
        line-height: 50px;
    }
    .type{
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 16px;
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
        margin-top: 20px;
        flex-direction: row;
        align-items: center;
        border-top-width: 1px;
        border-style: dotted;
        border-top-color: #dedede;
    }
    .info-item{
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 80px;
    }
    .info-item:active{
        background-color: #f2f2f2;
    }
    .info-icon{
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
    .info-text{
        font-size: 22px;
        color: #999;
    }
</style>
