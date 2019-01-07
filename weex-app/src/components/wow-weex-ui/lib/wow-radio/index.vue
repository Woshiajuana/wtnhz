<template>
    <div class="wrap" :style="d_radio_style">
        <div class="item"
             :style="d_radio_item_style"
             v-for="(item, index) in radio_arr"
             :key="index">
            <div class="icon" :style="d_radio_item_icon_style"></div>
            <text class="text" :style="d_radio_item_text_style">{{item[radio_txt_key]}}</text>
        </div>
    </div>
</template>
<script>
    import config                       from './config'
    import Mixin                        from './mixins'
    import AssignMixin                  from './../../mixins/assign.mixin'
    export default {
        mixins: [
            Mixin,
            AssignMixin,
        ],
        props: {
            radio_arr: { default: config.radio_arr },
            radio_txt_key: { default: config.radio_txt_key },
            radio_value: { default: config.radio_value },

            radio_style: { default: config.radio_style },
            radio_item_style: { default: config.radio_item_style },
            radio_item_icon_style: { default: config.radio_item_icon_style },
            radio_item_text_style: { default: config.radio_item_text_style },
        },
        computed: {
            computedStyle () {
                return this.switch_value
                    ? Object.assign({}, this.d_switch_style, this.d_switch_active_style)
                    : this.d_switch_style
            }
        },
        created(){
            this._wowAssign(Mixin.data(), config);
        },
        methods: {
            handleClick() {
                this.$emit('click', (type) => {
                    this.switch_value = !!type || !this.switch_value;
                })
            }
        },
    }
</script>
