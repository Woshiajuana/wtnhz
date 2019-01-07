<template>
    <wow-view
        view_header_right_txt="修改资料"
        :view_header_right_txt_style="{color: '#fc5366'}"
        :view_header_style="{backgroundColor: 'transparent'}">
        <div class="user">
            <image class="bg"></image>
            <div class="box">
                <image class="image"></image>
            </div>
            <div class="info">
                <text class="name">woshiajuana</text>
                <image class="sex" :src="src$.man"></image>
            </div>
        </div>
        <wow-input-cell
            v-for="(item, key) in objInput$"
            :key="key"
            :input_use="key === 'nickname'"
            input_placeholder=""
            :input_label_txt="item.label"
            :input_value="item.value">
            <wow-radio
                @input="handleInput(item, $event)"
                slot="input-right"
                v-if="item.radio"
                :radio_arr="item.radio"
                :radio_value="item.value"
            ></wow-radio>
            <wow-arrow
                v-if="item.arrow"
                slot="input-right"
            ></wow-arrow>
        </wow-input-cell>
        <div class="null"></div>
        <wow-button
            class="button"
            button_txt="安全退出"
        ></wow-button>
    </wow-view>
</template>

<script>
    import WowView                      from 'components/wow-weex-ui/lib/wow-view'
    import WowRadio                     from 'components/wow-weex-ui/lib/wow-radio'
    import WowArrow                     from 'wow-weex-ui/lib/wow-arrow'
    import WowInputCell                 from 'wow-weex-ui/lib/wow-input-cell'
    import WowButton                    from 'wow-weex-ui/lib/wow-button'
    import SourceMixin                  from 'mixins/source.mixin'
    import InputMixin                   from 'mixins/input.mixin'

    const srcArr = [
        { key: 'man', value: 'sex-man-icon.png', },
        { key: 'woman', value: 'sex-woman-icon.png', },
    ];

    export default {
        mixins: [
            SourceMixin,
            InputMixin,
        ],
        data () {
            return {
                objInput$: {
                    // 昵称
                    nickname: {
                        value: '9@qq.com',
                        label: '昵称',
                        type: 'text',
                        placeholder: '请输入昵称',
                        use: [
                            {
                                nonempty: true,
                                prompt: '请输入昵称',
                            },
                        ],
                    },
                    // 性别
                    sex: {
                        value: '1',
                        label: '性别',
                        type: 'text',
                        placeholder: '请输入性别',
                        use: [
                            {
                                nonempty: true,
                                prompt: '请输入性别',
                            },
                        ],
                        radio: [
                            { text: '男', value: '1' },
                            { text: '女', value: '0' },
                        ]
                    },
                    // 职业
                    job: {
                        value: '9@qq.com',
                        label: '职业',
                        type: 'text',
                        placeholder: '请输入职业',
                        use: [
                            {
                                nonempty: true,
                                prompt: '请输入职业',
                            },
                        ],
                        arrow: true,
                    },
                }
            }
        },
        created () {
            this.sourceGet(srcArr);
        },
        components: {
            WowView,
            WowArrow,
            WowButton,
            WowRadio,
            WowInputCell,
        },
    }
</script>

<style>
    .user{
        height: 375px;
        justify-content: center;
        align-items: center;
    }
    .bg{
        position: absolute;
        left: 0;
        top: 0;
        margin-top: -375px;
        width: 750px;
        height: 750px;
        background-color: #333333;
    }
    .box{
        width: 130px;
        height: 130px;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 130px;
    }
    .image{
        width: 125px;
        height: 125px;
        border-radius: 125px;
    }
    .info{
        margin-top: 20px;
        flex-direction: row;
        align-items: center;
    }
    .name{
        font-size: 36px;
        color: #fff;
        margin-right: 10px;
    }
    .sex{
        width: 30px;
        height: 30px;
    }
    .null{
        flex: 1;
    }
    .button{
        margin-bottom: 80px;
    }
</style>
