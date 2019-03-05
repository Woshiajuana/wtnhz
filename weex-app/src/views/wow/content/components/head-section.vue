<template>
    <div class="header">
        <text class="title"
              @appear="emitEvent('appear')"
              @disappear="emitEvent('disappear')"
        >{{data.title}}</text>
        <div class="user">
            <image
                class="image"
                :src="data.author && data.author.avatar"
            ></image>
            <text class="name">{{data.author && data.author.name}}</text>
            <text class="time">{{data.time}}</text>
        </div>
        <div class="info">
            <div class="info-item">
                <image class="info-icon" :src="src$.give"></image>
                <text class="info-text">{{data.praise}}</text>
            </div>
            <div class="info-item">
                <image class="info-icon" :src="src$.msg"></image>
                <text class="info-text">{{data.comment}}</text>
            </div>
            <div class="info-item">
                <image class="info-icon" :src="src$.collect"></image>
                <text class="info-text">{{data.collect}}</text>
            </div>
        </div>
    </div>
</template>

<script>
    import EmitMixin                    from 'mixins/emit.mixin'
    import SourceMixin                  from 'mixins/source.mixin'

    const srcArr = [
        { key: 'give_active', value: 'give-icon-fc5366.png', },
        { key: 'give', value: 'give-icon-999.png', },
        { key: 'collect', value: 'collect-icon-999.png', },
        { key: 'collect_active', value: 'collect-icon-fc5366.png', },
        { key: 'msg', value: 'msg-icon-999.png', },
    ];

    export default {
        mixins: [
            EmitMixin,
            SourceMixin,
        ],
        props: {
            data: { default: {} },
        },
        created () {
            this.sourceGet(srcArr);
        },
    }
</script>

<style>
    .header{
        align-items: center;
        padding-top: 60px;
        padding-bottom: 60px;
        padding-left: 100px;
        padding-right: 100px;
    }
    .title{
        text-align: center;
        color: #000;
        font-size: 48px;
        line-height: 70px;
    }
    .user{
        margin-top: 36px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .image{
        width: 42px;
        height: 42px;
        border-radius: 42px;
        margin-right: 16px;
    }
    .name{
        font-size: 24px;
        line-height: 44px;
        color: #999;
        margin-right: 32px;
    }
    .time{
        font-size: 24px;
        line-height: 44px;
        color: #999;
    }
    .info{
        margin-top: 36px;
        flex-direction: row;
        align-items: center;
    }
    .info-item{
        flex-direction: row;
        align-items: center;
        margin-right: 20px;
        margin-left: 20px;
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
