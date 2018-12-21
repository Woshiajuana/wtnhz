<template>
    <wow-view
        view_header_center_txt="Sign Up">

        <div class="wrap">

            <image class="logo" :src="src$.logo"></image>

            <input-box
                class="input-box"
                input_label="EMAIL"
                :input_value="email"
                @input="handleInput('email', $event)"
                input_placeholder="Please Enter Email"
            ></input-box>

            <input-box
                class="input-box"
                input_label="VERIFICATION CODE"
                :input_value="email"
                @input="handleInput('email', $event)"
                input_placeholder="Please Enter Code">
                <wow-count-down
                    :count_style="{
                    borderColor: '#dedede',
                    borderLeftWidth: 1,
                    height: 40,
                    width: 200,}"
                    @click="handleSend"
                ></wow-count-down>
            </input-box>

            <input-box
                v-model="password"
                class="input-box"
                input_type="password"
                input_label="PASSWORD"
                :input_value="password"
                @input="handleInput('password', $event)"
                input_placeholder="Please Enter Password"
            ></input-box>

            <input-box
                v-model="password"
                class="input-box"
                input_type="password"
                input_label="PASSWORD"
                :input_value="password"
                @input="handleInput('password', $event)"
                input_placeholder="Please Enter The Password Again"
            ></input-box>

            <div class="prompt">
                <wow-switch
                    @click="switch_value = !switch_value"
                    :switch_value="switch_value"
                    :switch_style="{ width: 50, height: 32 }"
                    :switch_inner_style="{ width: 28, height: 28 }"
                ></wow-switch>
                <text class="prompt-text" @click="switch_value = !switch_value">I have read and agreed</text>
                <text class="prompt-link">《Service Agreement》</text>
            </div>

            <wow-button
                @click="handleClear"
                class="button"
                button_txt="SIGN UP"
            ></wow-button>

        </div>

    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowButton                    from 'wow-weex-ui/lib/wow-button'
    import WowSwitch                    from 'wow-weex-ui/lib/wow-switch'
    import WowCountDown                 from 'wow-weex-ui/lib/wow-count-down'
    import SourceMixin                  from 'mixins/source.mixin'
    import InputMixin                   from 'mixins/input.mixin'
    import InputBox                     from './components/input-box.vue'

    const srcArr = [
        { key: 'logo', value: 'logo-icon-fc5366.png', },
    ];

    export default {
        mixins: [
            SourceMixin,
            InputMixin,
        ],
        data () {
            return {
                email: '',
                password: '',
                switch_value: true,
            }
        },
        created () {
            this.sourceGet(srcArr);
        },
        methods: {
            handleSend (callback) {
                callback();
            },
            handleClear (callback) {
                callback();
            },
        },
        components: {
            WowView,
            WowButton,
            InputBox,
            WowSwitch,
            WowCountDown,
        },
    }
</script>

<style>

    .wrap{
        flex: 1;
        align-items: center;
    }
    .logo{
        width: 150px;
        height: 150px;
        margin-top: 20px;
        margin-bottom: 50px;
    }
    .input-box{
        margin-top: 30px;
    }
    .button{
        margin-top: 100px;
        margin-left: 0;
    }
    .prompt{
        width: 640px;
        margin-top: 20px;
        align-items: center;
        flex-direction: row;
    }
    .prompt-text{
        color: #999;
        font-size: 26px;
        padding-left: 10px;
        line-height: 30px;
    }

    .prompt-link{
        line-height: 30px;
        color: #333;
        font-size: 26px;
        margin-left: 20px;
    }
</style>
