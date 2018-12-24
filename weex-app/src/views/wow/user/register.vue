<template>
    <wow-view
        view_header_center_txt="Sign Up">
        <div class="wrap">
            <image class="logo" :src="src$.logo"></image>
            <input-box
                v-for="(item, key) in objInput$"
                :key="key"
                class="input-box"
                :input_label="item.label"
                :input_value="item.value"
                :input_type="item.type"
                :input_placeholder="item.placeholder"
                @input="handleInput(item, $event)">
                <wow-count-down
                    v-if="key === 'code'"
                    :count_style="{
                    borderColor: '#dedede',
                    borderLeftWidth: 1,
                    height: 40,
                    width: 200,}"
                    @click="handleSend"
                ></wow-count-down>
            </input-box>
            <div class="prompt">
                <wow-switch
                    @click="objAgree$.value = !objAgree$.value"
                    :switch_value="objAgree$.value"
                    :switch_style="{ width: 50, height: 32 }"
                    :switch_inner_style="{ width: 28, height: 28 }"
                ></wow-switch>
                <text class="prompt-text" @click="objAgree$.value = !objAgree$.value">我已阅读并同意</text>
                <text class="prompt-link">《SO注意服务协议》</text>
            </div>
            <wow-button
                @click="handleSubmit"
                :button_disabled="computedDisabled"
                :button_style="{marginLeft: 0, marginTop: 100}"
                button_txt="注 册"
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
    import VerifyUtil                   from 'utils/verify.util'
    import Mixin                        from './register.mixin'
    import InputBox                     from './components/input-box.vue'

    const srcArr = [
        { key: 'logo', value: 'logo-icon-fc5366.png', },
    ];

    export default {
        mixins: [
            SourceMixin,
            InputMixin,
            Mixin,
        ],
        data () {
            return {
                email: '',
                password: '',
                switch_value: true,
            }
        },
        computed: {
            computedDisabled () {
                let result = VerifyUtil.multiple(this.objInput$, 'nonempty');
                return result || !this.objAgree$.value;
            }
        },
        created () {
            this.sourceGet(srcArr);
        },
        methods: {
            handleSend (callback) {
                if (VerifyUtil.single(this.objInput$.email))
                    return null;
                callback();
            },
            // 提交
            handleSubmit (callback) {
                if (VerifyUtil.multiple(this.objInput$))
                    return callback();
                if (VerifyUtil.single(this.objAgree$))
                    return callback();
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
        width: 750px;
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
