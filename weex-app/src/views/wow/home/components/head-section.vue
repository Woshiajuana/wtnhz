<template>
    <div class="head" slot="view-header">
        <div class="title">
            <text class="title-text">{{'最最新问题最新问题最最最新问题最新问题最新问题新问题' | filterCutOut(10)}}</text>
            <image class="arrow" :src="src$.arrow"></image>
        </div>
        <image class="search" :src="src$.search"></image>
    </div>
</template>

<script>
    import SourceMixin                  from 'mixins/source.mixin'
    import FilterMixin                  from 'mixins/filter.mixin'

    const srcArr = [
        { key: 'arrow', value: 'triangle-down-ffffff-icon.png', },
        { key: 'search', value: 'search-icon-ffffff.png', },
    ];

    export default {
        mixins: [
            SourceMixin,
            FilterMixin,
        ],
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
        width: 40px;
        height: 40px;
    }
</style>
