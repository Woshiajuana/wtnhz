<template>
    <div class="wrap"
         @click="handleClick"
         :style="d_input_wrap_style">
        <slot name="input-left"></slot>
        <text class="label"
              v-if="input_label_txt"
              :style="d_input_label_style"
        >{{input_label_txt}}</text>
        <text class="input"
              v-if="!input_use && input_use_right"
              :style="d_input_style"
        >{{input_value || input_placeholder}}</text>
        <input
            v-if="input_use && input_use_right"
            class="input"
            v-model="input_value"
            :type="input_type"
            @input="handleInput"
            :disabled="input_disabled"
            :maxlength="input_max_length || 9999"
            :style="d_input_style"
            :placeholder="input_placeholder"
            :placeholder-color="input_placeholder_color"/>
        <slot name="input-other"></slot>
        <slot name="input-right"></slot>
    </div>
</template>
<script>
    import config                       from './config'
    import Mixin                        from './mixins'
    import InputMixin                   from './../../mixins/input.mixin'
    import AssignMixin                  from './../../mixins/assign.mixin'
    export default {
        mixins: [InputMixin, Mixin, AssignMixin],
        props: {
            input_type: { default: config.input_type },
            input_disabled: { default: config.input_disabled },
            input_value: { default: config.input_value },
            input_use: { default: config.input_use },
            input_use_right: { default: config.input_use_right },
            input_style: { default: {} },
            input_wrap_style: { default: {} },
            input_label_style: { default: {} },
            input_label_txt: { default: config.input_label_txt },
            input_placeholder: { default: config.input_placeholder },
            input_placeholder_color: { default: config.input_placeholder_color },
            input_max_length: { default: config.input_max_length },
        },
        model: {
            prop: 'input_value',
            event: 'input'
        },
        created(){
            this._wowAssign(Mixin.data(), config);
        },
        methods: {
            handleClick (event) {
                if (this.input_disabled) return;
                this.$emit('click', event);
            }
        }
    }
</script>
<style>
    .wrap{
        flex-direction: row;
        align-items: center;
        padding-left: 32px;
    }
    .label{
        margin-right: 32px;
        flex-direction: row;
        align-items: center;
    }
    .input{
        flex: 1;
        border: none;
        text-align: right;
        padding-right: 32px;
    }
</style>
