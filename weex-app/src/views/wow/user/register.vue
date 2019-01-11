<template>
    <wow-view>
        <div class="wrap">
            <head-section
                title="注册"
                title_sub="请填写帐号信息"
            ></head-section>
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
    import InputMixin                   from 'mixins/input.mixin'
    import Api                          from 'api/register.api'
    import Http                         from 'plugins/http.plugin'
    import Router                       from 'plugins/router.plugin'
    import Dialogs                      from 'plugins/dialogs.plugin'
    import VerifyUtil                   from 'utils/verify.util'
    import ExtractUtil                  from 'utils/extract.util'
    import Mixin                        from './register.mixin'
    import InputBox                     from './components/input-box.vue'
    import HeadSection                  from './components/head-section.vue'

    export default {
        mixins: [
            InputMixin,
            Mixin,
        ],
        computed: {
            computedDisabled () {
                let result = VerifyUtil.multiple(this.objInput$, 'nonempty');
                return result || !this.objAgree$.value;
            }
        },
        methods: {
            handleSend (callback) {
                if (VerifyUtil.single(this.objInput$.email))
                    return null;
                let options = ExtractUtil.input(this.objInput$);
                Http(Api.doFetchVerifyCode, options).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    Dialogs.toast('发送验证码成功');
                    callback();
                }).catch((err) => {
                    Dialogs.toast(err);
                });
            },
            // 提交
            handleSubmit (callback) {
                if (VerifyUtil.multiple(this.objInput$))
                    return callback();
                if (VerifyUtil.single(this.objAgree$))
                    return callback();
                let options = ExtractUtil.input(this.objInput$);
                Http(Api.doUserRegister, options).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    Dialogs.toast('注册成功');
                    Router.pop();
                }).catch((err) => {
                    Dialogs.toast(err);
                }).finally(() => {
                    callback();
                });
            },
        },
        components: {
            WowView,
            WowButton,
            InputBox,
            WowSwitch,
            HeadSection,
            WowCountDown,
        },
    }
</script>

<style>
    .wrap{
        width: 750px;
        align-items: center;
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
