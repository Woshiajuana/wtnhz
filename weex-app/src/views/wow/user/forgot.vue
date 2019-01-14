<template>
    <wow-view>
        <div class="wrap">
            <head-section
                title="忘记密码"
                title_sub="请填写帐号信息并设置新密码"
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
            <wow-button
                @click="handleSubmit"
                :button_disabled="computedDisabled"
                :button_style="{marginLeft: 0, marginTop: 100}"
                button_txt="确 定"
            ></wow-button>
        </div>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowButton                    from 'wow-weex-ui/lib/wow-button'
    import WowCountDown                 from 'wow-weex-ui/lib/wow-count-down'
    import InputMixin                   from 'mixins/input.mixin'
    import RouterMixin                  from 'mixins/router.mixin'
    import Api                          from 'config/api.config'
    import Http                         from 'plugins/http.plugin'
    import Router                       from 'plugins/router.plugin'
    import Dialogs                      from 'plugins/dialogs.plugin'
    import VerifyUtil                   from 'utils/verify.util'
    import ExtractUtil                  from 'utils/extract.util'
    import Mixin                        from './forgot.mixin'
    import InputBox                     from './components/input-box.vue'
    import HeadSection                  from './components/head-section.vue'

    export default {
        mixins: [
            RouterMixin,
            InputMixin,
            Mixin,
        ],
        computed: {
            computedDisabled () {
                return VerifyUtil.multiple(this.objInput$, 'nonempty');
            }
        },
        created () {
            this.routerGetParams();
            this.assignmentData();
        },
        methods: {
            assignmentData () {
                console.log(this.params$);
                ExtractUtil.assignment(this.params$, this.objInput$);
            },
            handleSend (callback) {
                if (VerifyUtil.single(this.objInput$.email))
                    return null;
                let options = ExtractUtil.input(this.objInput$);
                Http(Api.doFetchVerifyCode, options, { auth: false }).then(({code, data, msg}) => {
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
                let options = ExtractUtil.input(this.objInput$);
                Http(Api.doUserForgot, options, { auth: false }).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    Dialogs.toast('设置成功');
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
            WowCountDown,
            HeadSection,
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
</style>
