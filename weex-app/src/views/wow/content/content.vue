<template>
    <wow-view>
        <div class="header">
            <text class="title">{{params$.title}}</text>
        </div>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import RouterMixin                  from 'mixins/router.mixin'

    export default {
        mixins: [
            RouterMixin,
        ],
        created () {
            this.routerGetParams();
        },
        components: {
            WowView,
        },
    }
</script>

<style>

</style>
