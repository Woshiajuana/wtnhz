<template>
    <wow-view>
        <div class="header">
            <text class="title">{{params$.title}}</text>
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
        <div class="main">
            <text class="text"></text>
        </div>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import RouterMixin                  from 'mixins/router.mixin'
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
            RouterMixin,
            SourceMixin,
        ],
        created () {
            this.sourceGet(srcArr);
            this.routerGetParams();
        },
        components: {
            WowView,
        },
    }
</script>

<style>
    .header{

    }
    .title{

    }
    .user{

    }
    .image{

    }
    .name{

    }
    .time{

    }
    .info{

    }
    .info-item{

    }
    .info-icon{

    }
    .info-text{
        
    }
</style>
