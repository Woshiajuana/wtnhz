<template>
    <wow-view
        :view_header_left_src="src$.close">

    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import SourceMixin                  from 'mixins/source.mixin'

    const srcArr = [
        { key: 'close', value: 'header-left-close.png?6', },
    ];

    export default {
        mixins: [
            SourceMixin,
        ],
        components: {
            WowView,
        },
        created () {
            this.sourceGet(srcArr);
        },
    }
</script>

<style>

</style>
