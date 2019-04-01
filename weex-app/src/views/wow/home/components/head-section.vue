<template>
    <div class="head" slot="view-header">
        <div class="title" @click="routerPush('wow_publish_theme', { from: 'home' })">
            <text class="title-text">{{theme.name | filterCutOut(10)}}</text>
            <image class="arrow" :src="src$.arrow"></image>
        </div>
        <image class="icon search" :src="src$.search"></image>
        <image class="icon" :src="src$.add" @click="routerPush('wow_publish', {}, user)"></image>
    </div>
</template>

<script>
    import SourceMixin                  from 'mixins/source.mixin'
    import FilterMixin                  from 'mixins/filter.mixin'
    import RouterMixin                  from 'mixins/router.mixin'

    const srcArr = [
        { key: 'arrow', value: 'triangle-down-ffffff-icon.png', },
        { key: 'search', value: 'search-icon-ffffff.png', },
        { key: 'add', value: 'add-icon-ffffff.png?3', },
    ];

    export default {
        mixins: [
            SourceMixin,
            FilterMixin,
            RouterMixin,
        ],
        props: {
            user: { default: '' },
            theme: { default: '' },
        },
        created () {
            this.sourceGet(srcArr);
        },
    }
</script>

<style>
    .head{
        flex: 1;
        background-color: #fc5366;
        flex-direction: row;
        height: 90px;
        align-items: center;
        padding-left: 32px;
        padding-right: 32px;
    }
    .title{
        flex: 1;
        flex-direction: row;
        align-items: center;
        margin-right: 100px;
    }
    .title-text{
        color: #fff;
        font-size: 32px;
        margin-right: 6px;
    }
    .arrow{
        width: 30px;
        height: 30px;
    }
    .search{
        width: 36px;
        height: 36px;
    }
    .icon{
        margin-left: 60px;
        width: 40px;
        height: 40px;
    }
</style>
