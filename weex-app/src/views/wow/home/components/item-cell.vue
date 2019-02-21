<template>
    <div class="wrap">
        <div class="inner">
            <image class="image" src="https://img.mukewang.com/5c6d3e4e0001946418720632.jpg"></image>
            <div class="content">
                <div class="title">
                    <text class="title-text">javascript基础开发</text>
                </div>
                <div class="type">
                    <div class="type-item">
                        <text class="type-text">JAVA</text>
                    </div>
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
        padding-left: 32px;
        background-color: #fff;
    }
    .image{
        width: 140px;
        height: 140px;
        margin-right: 32px;
    }
    .inner{
        flex-direction: row;
        align-items: center;
        padding-right: 32px;
        flex: 1;
        padding-top: 32px;
        padding-bottom: 0;
    }
    .title{

    }
    .title-text{

    }
    .type{

    }
    .type-item{

    }
    .type-text{

    }
    .info{
        flex-direction: row;
        align-items: center;
        height: 80px;
        border-top-width: 1px;
        border-top-color: #dedede;
        border-bottom-width: 1px;
        border-bottom-color: #dedede;
    }
    .info-item{
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 40px;
        background-color: #fff;
        border-right-width: 1px;
        border-color: #dedede;
    }
    .info-icon{

    }
    .info-text{

    }
</style>
