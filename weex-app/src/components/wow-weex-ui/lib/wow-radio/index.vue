<template>
    <div class="wrap" :style="d_radio_style">
        <div class="item"
             :style="d_radio_item_style"
             v-for="(item, index) in radio_arr"
             :key="index">
            <div class="spot"
                 :style="computedSpotStyle(radio_value === item.value)">
                <div class="spot-inner"
                     v-if="radio_value === item.value"
                     :style="d_radio_item_spot_inner_style"
                ></div>
            </div>
            <text class="text"
                  :style="computedTextStyle(radio_value === item.value)"
            >{{item[radio_txt_key]}}</text>
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
            radio_item_spot_style: { default: config.radio_item_spot_style },
            radio_item_spot_checked_style: { default: config.radio_item_spot_checked_style },
            radio_item_spot_inner_style: { default: config.radio_item_spot_inner_style },
            radio_item_text_style: { default: config.radio_item_text_style },
            radio_item_text_checked_style: { default: config.radio_item_text_checked_style },
        },
        created(){
            this._wowAssign(Mixin.data(), config);
        },
        methods: {
            computedSpotStyle (type) {
                return type
                    ? Object.assign({}, this.d_radio_item_spot_style, this.d_radio_item_spot_checked_style)
                    : this.d_radio_item_spot_style
            },
            computedTextStyle (type) {
                return type
                    ? Object.assign({}, this.d_radio_item_text_style, this.d_radio_item_text_checked_style)
                    : this.d_radio_item_text_style
            },
            handleClick() {
                this.$emit('click', (type) => {
                    this.switch_value = !!type || !this.switch_value;
                })
            },
        },
    }
</script>
