<template>
    <div class="button-wrap"
         @click="clickHandle"
         :style="{height: button_height,
         backgroundColor: button_disabled ? button_disabled_background_color : button_background_color,
         marginTop: button_margin_top,
         width: button_width,
         borderRadius: button_radius,
         marginLeft: button_margin_left}">
        <text class="button-txt"
              :style="{fontSize: button_txt_size,
              color: button_txt_color}">{{button_txt}}</text>
    </div>
</template>
<script>
    import config from './config'
    export default {
        name: 'wow-button',
        data () {
            return {
                flag: true
            }
        },
        props: {
            button_width: { default: config.button_width },
            button_height: { default: config.button_height },
            button_txt: { default: config.button_txt },
            button_txt_color: { default: config.button_txt_color },
            button_margin_left: { default: config.button_margin_left },
            button_txt_size: { default: config.button_txt_size },
            button_disabled: { default: config.button_disabled },
            button_disabled_background_color: { default: config.button_disabled_background_color },
            button_background_color: { default: config.button_background_color },
            button_radius: { default: config.button_radius },
            button_margin_top: { default: config.button_margin_top },
            button_delay: { default: config.button_delay },
        },
        methods: {
            clickHandle () {
                (!this.button_disabled && this.flag) && this.$emit('click', ()=>{
                    setTimeout(() => {
                        this.flag = true;
                    }, +this.button_delay);
                });
                !this.button_disabled && (this.flag = false);
            }
        },
    }
</script>
<style>
    .button-wrap {
        align-items: center;
        justify-content: center;
        /*background-image: linear-gradient(to right, #bbb, #bbb);*/
        background-color: #bbb;
    }
    .button-wrap:active{
        background-color: #bbb;
    }
    /*.button-wrap-active{*/
        /*background-image: linear-gradient(to right, #EE4432, #EE6833);*/
    /*}*/
    /*.button-wrap-active:active{*/
        /*background-image: linear-gradient(to right, #ff4b13, #ff4b13);*/
    /*}*/
</style>
