<template>
    <div class="wrap">
        <text class="label">{{input_label}}</text>
        <input
            class="input"
            :type="input_type"
            :placeholder="input_placeholder"
            :maxlength="input_max"
            placeholder-color="#dedede"/>
    </div>
</template>

<script>
    import EmitMixin                    from 'wow-weex-ui/mixins/emit.mixin'
    export default {
        mixins: [EmitMixin],
        props: {
            input_placeholder: { default: '请输入' },
            input_type: { default: 'text' },
            input_label: { default: '' },
            input_max: { default: '32' },
        },
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
    .input{
        height: 80px;
        color: #333;
        font-size: 28px;
    }
</style>
