<template>
    <div class="wrap">
        <div class="section">
            <image class="image" :src="src$.def"></image>
            <div class="info">
                <div class="top">
                    <text class="name">woshiajuana</text>
                    <image class="sex" :src="src$.man"></image>
                </div>
                <div class="bottom">
                    <text class="introduce">真是一个有趣的人~~~</text>
                </div>
            </div>
        </div>
        <div class="section user-number">
            <div class="item">
                <text class="label">关注</text>
                <text class="value">999</text>
            </div>
            <div class="item">
                <text class="label">粉丝</text>
                <text class="value">999</text>
            </div>
            <div class="item last-item">
                <text class="label">积分</text>
                <text class="value">999</text>
            </div>
        </div>
    </div>
</template>

<script>
    import SourceMixin                  from 'mixins/source.mixin'

    const srcArr = [
        { key: 'def', value: 'default-head-icon.png', },
        { key: 'man', value: 'sex-man-icon.png', },
        { key: 'woman', value: 'sex-woman-icon.png', },
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
        padding-left: 32px;
        padding-right: 32px;
        border-color: #dedede;
        border-bottom-width: 1px;
    }
    .section{
        flex-direction: row;
        align-items: center;
    }
    .user-number{
        padding-top: 32px;
        padding-bottom: 32px;
    }
    .image{
        width: 120px;
        height: 120px;
        background-color: red;
        border-radius: 120px;
        margin-right: 32px;
    }
    .info{
        justify-content: center;
        flex: 1;
    }
    .top{
        flex-direction: row;
        align-items: center;
    }
    .name{
        font-size: 42px;
        color: #333;
        margin-right: 10px;
    }
    .sex{
        width: 30px;
        height: 30px;
        background-color: red;
    }
    .bottom{
        margin-top: 10px;
    }
    .introduce{
        font-size: 20px;
        color: #999;
    }
    .item{
        flex: 1;
        justify-content: center;
        align-items: center;
        border-color: #dedede;
        border-right-width: 1px;
    }
    .last-item{
        border-right-width: 0;
    }
    .label{
        font-size: 24px;
        color: #999;
    }
    .value{
        font-size: 32px;
        color: #333;
        margin-top: 10px;
    }
</style>
