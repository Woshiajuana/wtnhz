<template>
    <wow-view
        :view_header_left_src="src$.close">
        <input-box
            v-for="(item, key) in objInput$"
            :key="key"
            class="input-box"
            :input_label="item.label"
            :input_value="item.value"
            :input_type="item.type"
            :input_placeholder="item.placeholder"
            @input="handleInput(item, $event)">
        </input-box>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import SourceMixin                  from 'mixins/source.mixin'
    import InputMixin                   from 'mixins/input.mixin'
    import InputBox                     from 'components/input-box.vue'
    import Mixin                        from './publish.mixin'

    const srcArr = [
        { key: 'close', value: 'header-left-close.png?6', },
    ];

    export default {
        mixins: [
            Mixin,
            InputMixin,
            SourceMixin,
        ],
        created () {
            this.sourceGet(srcArr);
        },
        components: {
            WowView,
            InputBox,
        },
    }
</script>

<style>
    .input-box{
        margin-top: 30px;
    }
</style>
