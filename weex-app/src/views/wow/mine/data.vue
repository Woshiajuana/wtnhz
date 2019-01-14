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
            :action_options="arrOptions"
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
                arrOptions: [
                    { src: '', text: '拍照' },
                    { src: '', text: '相册' },
                    { src: '', text: '相册' },
                ],
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
        },
        methods: {
            handleButton (callback) {
                UserService.exit().finally(() => {callback();})
            },
            handleRight () {
                if (this.disabled)
                    return this.disabled = false;
            },
            handleSelect () {

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
