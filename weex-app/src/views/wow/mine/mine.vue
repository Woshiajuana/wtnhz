<template>
    <wow-view
        :view_header_right_src="src$.set"
        :view_style="{backgroundColor: '#f2f2f2'}"
        view_header_left_src="">
        <user-section></user-section>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import SourceMixin                  from 'mixins/source.mixin'
    import UserSection                  from './components/user-section.vue'

    const srcArr = [
        { key: 'set', value: 'set-icon.png', },
    ];

    export default {
        mixins: [
            SourceMixin,
        ],
        created () {
            this.sourceGet(srcArr);
        },
        components: {
            WowView,
            UserSection,
        },
    }
</script>

<style>

</style>
