<template>
    <div class="wrap">
        <div class="inner">
            <div class="head">
                <image class="image"></image>
                <text class="title">5条回复</text>
            </div>
            <operation-panel></operation-panel>
        </div>
    </div>
</template>

<script>
    import OperationPanel               from './operation-panel.vue'

    export default {
        components: {
            OperationPanel,
        }
    }
</script>

<style>
    .wrap{

    }
</style>
