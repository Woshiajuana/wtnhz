<template>
    <div class="wrap">
        <text class="label">{{input_label}}</text>
        <div class="inner">
            <input
                class="input"
                :type="input_type"
                :placeholder="input_placeholder"
                :maxlength="input_max"
                @input="handleInput"
                :value="input_value"
                placeholder-color="#dedede"/>
            <div class="clear"
                 @click="handleClear"
                 :style="{visibility: input_value ? 'visible' : 'hidden'}">
                <image class="clear-icon" :src="src$.clear"></image>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import EmitMixin                    from 'wow-weex-ui/mixins/emit.mixin'
    import SourceMixin                  from 'mixins/source.mixin'

    const srcArr = [
        { key: 'clear', value: 'input-clear-icon.png', },
    ];

    export default {
        mixins: [EmitMixin, SourceMixin],
        props: {
            input_placeholder: { default: '请输入' },
            input_type: { default: 'text' },
            input_label: { default: '' },
            input_max: { default: '32' },
            input_value: { default: '' },
        },
        model: {
            prop: 'input_value',
            event: 'input'
        },
        created () {
            this.sourceGet(srcArr);
        },
        methods: {
            handleInput (event) {
                this.$emit('input', event.value);
            },
            handleClear () {
                this.$emit('input', ' ');
                setTimeout(() => {
                    this.$emit('input', '');
                })
            },
        }
    }
</script>

<style>
    .wrap{
        height: 120px;
        width: 640px;
        border-bottom-color: #ddd;
        border-bottom-width: 1px;
    }
    .label{
        height: 40px;
        font-size: 24px;
        color: #999;
        line-height: 40px;
    }
    .inner{
        flex-direction: row;
        align-items: center;
        height: 80px;
    }
    .input{
        flex: 1;
        height: 80px;
        color: #333;
        font-size: 28px;
    }
    .clear{
        width: 80px;
        height: 80px;
        margin-left: 20px;
        align-items: center;
        justify-content: center;
    }
    .clear:active{
        background-color: #dedede;
    }
    .clear-icon{
        width: 25px;
        height: 25px;
    }
</style>
