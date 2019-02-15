<template>
    <div>
        <wow-view
            :view_header_right_txt="disabled ? '编辑' : '保存'"
            :view_header_right_txt_style="{color: '#fc5366'}"
            @right="handleRight"
            :view_style="{backgroundColor: '#f2f2f2'}"
            view_header_center_txt="个人信息">
            <div class="wrap">
                <template
                    v-for="(item, key) in objInput$">
                    <wow-input-cell
                        v-if="key !== 'autograph'"
                        :class="[key === 'avatar' && 'avatar-wrap']"
                        @input="handleInput(item, $event, disabled)"
                        @click="handleSelect(key, disabled)"
                        :key="key"
                        :input_style="{color: disabled ? '#DEDEDE' : '#333'}"
                        :input_disabled="disabled"
                        :input_use="key !== 'job'"
                        :input_use_right="key | filterUseRight(disabled)"
                        :input_placeholder="item.placeholder"
                        :input_label_txt="item.label"
                        :input_value="item.value | filterSex(key)">
                        <div slot="input-right"
                             class="input-right">
                            <wow-radio
                                @input="handleInput(item, $event, disabled)"
                                v-if="item.radio && !disabled"
                                :radio_arr="item.radio"
                                :radio_value="item.value"
                            ></wow-radio>
                            <image
                                v-if="key === 'avatar'"
                                class="avatar"
                                :src="item.value || src$.def"
                            ></image>
                            <wow-arrow
                                v-if="item.arrow && !disabled"
                            ></wow-arrow>
                        </div>
                    </wow-input-cell>
                    <div class="textarea-wrap"
                         v-if="key === 'autograph'">
                        <div class="textarea-label">
                            <text class="textarea-label-text">{{item.label}}</text>
                        </div>
                        <textarea
                            class="textarea-value"
                            placeholder-color="#dedede"
                            :style="{color: disabled ? '#DEDEDE' : '#333'}"
                            :rows="3"
                            :disabled="disabled"
                            :value="item.value"
                            :placeholder="item.placeholder"
                            @input="handleInput(item, $event, disabled)"
                        ></textarea>
                    </div>
                </template>
            </div>
        </wow-view>
        <wow-action-sheet
            @change="handleChange"
            @close="actionSheet.is = false"
            v-if="actionSheet.is"
            :action_options="actionSheet.options"
        ></wow-action-sheet>
    </div>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowRadio                     from 'wow-weex-ui/lib/wow-radio'
    import WowArrow                     from 'wow-weex-ui/lib/wow-arrow'
    import WowInputCell                 from 'wow-weex-ui/lib/wow-input-cell'
    import WowActionSheet               from 'components/wow-weex-ui/lib/wow-action-sheet'
    import UserService                  from 'services/user.service'
    import SourceMixin                  from 'mixins/source.mixin'
    import InputMixin                   from 'mixins/input.mixin'
    import Api                          from 'config/api.config'
    import VerifyUtil                   from 'utils/verify.util'
    import ExtractUtil                  from 'utils/extract.util'
    import Http                         from 'plugins/http.plugin'
    import Store                        from 'plugins/store.plugin'
    import Camera                       from 'plugins/camera.plugin'
    import Dialogs                      from 'plugins/dialogs.plugin'
    import Mixin                        from './data.mixin'

    const srcArr = [
        { key: 'def', value: 'default-head-icon.png?8', },
        { key: 'man', value: 'sex-man-icon.png', },
        { key: 'woman', value: 'sex-woman-icon.png', },
    ];

    export default {
        mixins: [
            Mixin,
            SourceMixin,
            InputMixin,
        ],
        data () {
            return {
                disabled: true,
                actionSheet: {
                    is: false,
                    options: [
                        { src: '', text: '拍照', key: 'take' },
                        { src: '', text: '相册', key: 'pick' },
                    ],
                },
            }
        },
        filters: {
            filterSex (value, key) {
                if (key === 'sex')
                    return {'1': '男', '0': '女'}[value] || '';
                return value;
            },
            filterUseRight (value, disabled) {
                if (value === 'avatar')
                    return false;
                if (value !== 'sex')
                    return true;
                return disabled;
            },
        },
        created () {
            this.sourceGet(srcArr);
            this.assignmentData();
        },
        methods: {
            assignmentData () {
                UserService.get().then((user) => {
                    ExtractUtil.assignment(user, this.objInput$);
                });
            },
            handleRight () {
                if (this.disabled)
                    return this.disabled = false;
                if (VerifyUtil.multiple(this.objInput$))
                    return null;
                let options = ExtractUtil.input(this.objInput$);
                Http(Api.doUpdateUserInfo, options).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    Dialogs.toast('保存成功');
                    this.disabled = true;
                    Store.set(`${data.email}_avatar`, data.avatar);
                    return UserService.upt(data);
                }).catch((err) => {
                    Dialogs.toast(err);
                });
            },
            handleSelect (key) {
                if (this.disabled)
                    return null;
                if (key === 'avatar')
                    return this.actionSheet.is = true;
            },
            handleChange ({key}) {
                this.actionSheet.is = false;
                Camera[key]().then((res) => {
                    let options = {
                        base64: res.base64,
                        suffix: 'png',
                        action: 'head',
                    };
                    return Http(Api.doUploadPicture, options, {timeout: 60 * 1000 * 3});
                }).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    Dialogs.toast('上传成功');
                    this.objInput$.avatar.value = data.path;
                }).catch((err) => {
                    Dialogs.toast(err);
                });
            },
        },
        components: {
            WowView,
            WowArrow,
            WowRadio,
            WowInputCell,
            WowActionSheet,
        },
    }
</script>

<style>
    .wrap{
        margin-top: 20px;
        border-top-width: 1px;
        border-color: #dedede;
    }
    .avatar-wrap{
        margin-bottom: 20px;
    }
    .avatar{
        margin-right: 32px;
        margin-top: 20px;
        margin-bottom: 20px;
        width: 120px;
        height: 120px;
        border-radius: 120px;
    }
    .textarea-wrap{
        padding-left: 32px;
        padding-right: 32px;
        padding-bottom: 26px;
        border-bottom-width: 1px;
        border-color: #dedede;
        background-color: #fff;
    }
    .textarea-label{
        height: 100px;
        flex-direction: row;
        align-items: center;
    }
    .textarea-label-text{
        font-size: 32px;
        color: #333;
    }
    .textarea-value{
        flex: 1;
        height: 132px;
        font-size: 32px;
        color: #333;
        line-height: 44px;
    }
    .input-right{
        flex-direction: row;
        align-items: center;
    }
</style>
