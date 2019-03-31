<template>
    <wow-view
        view_use_scroll=""
        @right="handlePublish"
        view_header_right_txt="发布"
        :view_header_right_txt_style="{color: '#fc5366'}"
        :view_header_left_src="src$.close">
        <div class="input-box"
             :class="[item.mold === 'textarea' && 'textarea-box']"
             v-for="(item, key) in objInput$"
             :key="key">
            <input
                v-if="item.mold === 'input'"
                type="text"
                class="input"
                @input="handleInput(item, $event)"
                placeholder-color="#dedede"
                :placeholder="item.placeholder"
            />
            <div class="box"
                 @click="routerPush('wow_publish_theme')"
                 v-else-if="item.mold === 'select'">
                <text
                    class="input"
                    :class="[!item.value && 'input-placeholder']"
                >{{item.value || item.placeholder}}</text>
                <wow-arrow
                    :arrow_style="{ borderColor: '#dedede' }"
                ></wow-arrow>
            </div>
            <textarea
                v-else-if="item.mold === 'textarea'"
                class="content"
                :row="3"
                @input="handleInput(item, $event)"
                placeholder-color="#dedede"
                :placeholder="item.placeholder"
            ></textarea>
        </div>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowArrow                     from 'wow-weex-ui/lib/wow-arrow'
    import SourceMixin                  from 'mixins/source.mixin'
    import InputMixin                   from 'mixins/input.mixin'
    import RouterMixin                  from 'mixins/router.mixin'
    import ChannelMixin                 from 'mixins/channel.mixin'
    import Http                         from 'plugins/http.plugin'
    import Dialogs                      from 'plugins/dialogs.plugin'
    import Router                       from 'plugins/router.plugin'
    import Api                          from 'config/api.config'
    import VerifyUtil                   from 'utils/verify.util'
    import ExtractUtil                  from 'utils/extract.util'
    import Mixin                        from './publish.mixin'

    const srcArr = [
        { key: 'close', value: 'header-left-close.png?6', },
    ];

    export default {
        mixins: [
            Mixin,
            InputMixin,
            SourceMixin,
            RouterMixin,
            ChannelMixin,
        ],
        created () {
            this.sourceGet(srcArr);
            this.channelAdd(this.channel$.EVENT.$$POST_THEME, this.channelThemeHandle.bind(this));
        },
        methods: {
            channelThemeHandle (item) {
                let { _id, name } = item;
                this.objInput$.themeName.value = name;
                this.objHidden$.theme.value = _id;
            },
            handlePublish () {
                if (VerifyUtil.multiple(this.objInput$))
                    return null;
                let options = ExtractUtil.input(this.objInput$, this.objHidden$);
                Http(Api.doPostPublish, options).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    Dialogs.toast('发布成功');
                    Router.pop();
                }).catch((err) => {
                    Dialogs.toast(err);
                });
            },
        },
        components: {
            WowView,
            WowArrow,
        },
    }
</script>

<style>
    .input-box{
        margin-top: 30px;
        margin-right: 32px;
        margin-left: 32px;
        border-bottom-width: 1px;
        border-color: #f2f2f2;
        flex-direction: row;
        align-items: center;
    }
    .input{
        flex: 1;
        height: 90px;
        font-size: 28px;
        color: #333;
        line-height: 90px;
    }
    .input-placeholder{
        color: #dedede;
    }
    .content{
        flex: 1;
        font-size: 28px;
        color: #333;
        line-height: 1.5;
        height: 300px;
    }
    .box{
        flex: 1;
        flex-direction: row;
        align-items: center;
    }
    .box:active{
        background-color: #f2f2f2;
    }
    .textarea-box{
        border-bottom-width: 0;
    }
</style>
