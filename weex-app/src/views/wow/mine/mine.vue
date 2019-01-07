<template>
    <wow-view
        @right="routerPush('wow_app')"
        :view_header_right_src="src$.set"
        :view_style="{backgroundColor: '#f2f2f2'}"
        view_header_left_src="">
        <user-section></user-section>
        <div class="entry">
            <wow-input-cell
                v-for="(item, index) in arrEntry"
                :key="index"
                :input_style="{height: 80}"
                :input_wrap_style="{height: 90}"
                input_use=""
                input_value=""
                input_placeholder="">
                <wow-arrow slot="input-right"></wow-arrow>
            </wow-input-cell>
        </div>
    </wow-view>
</template>

<script>
    import WowView                      from 'components/wow-weex-ui/lib/wow-view'
    import WowInputCell                 from 'wow-weex-ui/lib/wow-input-cell'
    import WowArrow                     from 'wow-weex-ui/lib/wow-arrow'
    import SourceMixin                  from 'mixins/source.mixin'
    import RouterMixin                  from 'mixins/router.mixin'
    import UserSection                  from './components/user-section.vue'

    const srcArr = [
        { key: 'set', value: 'set-icon.png', },
    ];

    export default {
        mixins: [
            SourceMixin,
            RouterMixin,
        ],
        data () {
            return {
                arrEntry: 5
            }
        },
        created () {
            this.sourceGet(srcArr);
        },
        components: {
            WowView,
            UserSection,
            WowInputCell,
            WowArrow,
        },
    }
</script>

<style>
    .entry{
        border-color: #dedede;
        border-top-width: 1px;
        margin-top: 20px;
    }
</style>
