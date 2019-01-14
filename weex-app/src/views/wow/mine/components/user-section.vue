<template>
    <div class="wrap">
        <div class="section" @click="routerPush('wow_mine_core', {}, user)">
            <image class="image" :src="user.avatar || src$.def"></image>
            <div class="info">
                <template v-if="user">
                    <div class="top">
                        <text class="name">{{user.nickname || user.email}}</text>
                        <image class="sex" :src="user.sex === '0' ? src$.woman : src$.man"></image>
                    </div>
                    <div class="bottom">
                        <text class="introduce">{{user.introduce || '这个家伙什么都没留下~~~'}}</text>
                    </div>
                </template>
                <text v-if="!user" class="prompt">点击登录</text>
            </div>
        </div>
        <div class="section user-number">
            <div class="item">
                <text class="label">关注</text>
                <text class="value">{{user.following || '---'}}</text>
            </div>
            <div class="item">
                <text class="label">粉丝</text>
                <text class="value">{{user.follower || '---'}}</text>
            </div>
            <div class="item last-item">
                <text class="label">积分</text>
                <text class="value">{{user.integral || '---'}}</text>
            </div>
        </div>
    </div>
</template>

<script>
    import SourceMixin                  from 'mixins/source.mixin'
    import RouterMixin                  from 'mixins/router.mixin'

    const srcArr = [
        { key: 'def', value: 'default-head-icon.png?8', },
        { key: 'man', value: 'sex-man-icon.png', },
        { key: 'woman', value: 'sex-woman-icon.png', },
    ];

    export default {
        mixins: [
            SourceMixin,
            RouterMixin,
        ],
        props: {
            user: {default: ''},
        },
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
        background-color: #f2f2f2;
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
    .prompt{
        font-size: 32px;
        color: #333;
    }
</style>
