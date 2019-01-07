<template>
    <div class="wrap">
        <div class="main"
             @viewappear="handleEmit('viewappear', $event)"
             @viewdisappear="handleEmit('viewdisappear', $event)">
            <scroller
                v-if="view_use_scroll"
                :offset-accuracy="view_offset_accuracy"
                class="inner"
                :style="computedViewStyle"
                @scroll="handleEmit('scroll', $event)">
                <slot></slot>
            </scroller>
            <div class="inner"
                 :style="computedViewStyle"
                 v-else>
                <slot></slot>
            </div>
            <slot name="view-header"></slot>
        </div>
        <div class="header"
             v-if="view_use_header"
             :style="computedViewHeaderStyle">
            <div class="left"
                 @click="handleLeft"
                 :style="computedViewHeaderLeftStyle">
                <image
                    v-if="view_header_left_src"
                    :src="view_header_left_src"
                    :style="computedViewHeaderLeftSrcStyle"
                ></image>
                <text
                    :style="computedViewHeaderLeftTxtStyle"
                    v-if="view_header_left_txt"
                >{{view_header_left_txt}}</text>
            </div>
            <div class="center"
                 :style="computedViewHeaderCenterStyle">
                <text
                    :style="computedViewHeaderCenterTxtStyle"
                >{{view_header_center_txt}}</text>
            </div>
            <slot name="view-header-center"></slot>
            <div class="right"
                 @click="handleEmit('right', $event)"
                 :style="computedViewHeaderRightStyle">
                <image
                    v-if="view_header_right_src"
                    :src="view_header_right_src"
                    :style="computedViewHeaderRightSrcStyle"
                    autoBitmapRecycle="false"
                ></image>
                <text
                    :style="computedViewHeaderRightTxtStyle"
                    v-if="view_header_right_txt"
                >{{view_header_right_txt}}</text>
            </div>
            <slot name="view-header-cue"></slot>
        </div>
    </div>

</template>

<script>
    import config                       from './config'
    import Mixin                        from './mixins'
    import EmitMixin                    from './../../mixins/emit.mixin'
    import WeexMixin                    from './../../mixins/weex.mixin'

    const navigator = weex.requireModule('navigator');

    export default {
        mixins: [
            EmitMixin,
            WeexMixin,
            Mixin,
        ],
        props: {

            // 主要
            view_style: { default: {} },
            view_use_scroll: { default: config.view_use_scroll },
            view_use_left_event: { default: config.view_use_left_event },
            view_offset_accuracy: { default: config.view_offset_accuracy },

            // 头部
            view_use_header: { default: config.view_use_header },
            view_use_compatible: { default: config.view_use_compatible },
            view_header_style: { default: {} },

            // 头部左边
            view_header_left_style: { default: {} },
            view_header_left_src: { default: config.view_header_left_src },
            view_header_left_src_style: { default: {} },
            view_header_left_txt: { default: config.view_header_left_txt },
            view_header_left_txt_style: { default: {} },

            // 头部中间
            view_header_center_style: { default: {} },
            view_header_center_txt: { default: config.view_header_center_txt },
            view_header_center_txt_style: { default: {} },

            // 头部右边
            view_header_right_style: { default: {} },
            view_header_right_src: { default: config.view_header_right_src },
            view_header_right_src_style: { default: {} },
            view_header_right_txt: { default: config.view_header_right_txt },
            view_header_right_txt_style: { default: {} },

        },
        computed: {
            computedViewStyle () {
                let {
                    compatible,
                } = this.weex$;
                let height = this.view_header_style.height || config.view_header_style.height;
                let paddingTop = parseInt(height);
                if (this.view_use_compatible)
                    paddingTop += compatible;
                return Object.assign({ paddingTop }, config.view_style, this.view_style);
            },
            computedViewHeaderStyle () {
                let {
                    compatible,
                } = this.weex$;
                let paddingTop = 0;
                if (this.view_use_compatible)
                    paddingTop = compatible;
                let height = this.view_header_style.height || config.view_header_style.height;
                height = parseInt(height) + paddingTop;
                return Object.assign(config.view_header_style, this.view_header_style, { paddingTop, height },);
            }
        },
        created () {
            this.weexGet();
        },
        methods: {
            handleLeft (event) {
                this.view_use_left_event ? navigator.pop() : this.$emit('left', event);
            },
        }
    }
</script>

<style>
    .wrap{
        background-color: #fff;
    }
    .main{
        flex: 1;
        width: 750px;
        background-color: #fff;
    }
    .header {
        position: fixed;
        flex-direction: row;
        width: 750px;
        left: 0;
        top: 0;
        height: 90px;
    }
    .left,
    .right {
        position: absolute;
        flex-direction: row;
        align-items: center;
    }
    .right{
        right: 0;
    }
    .left{
        left: 0;
    }
    .center{
        position: absolute;
        flex-direction: row;
        left: 120px;
        right: 120px;
        text-align: center;
        justify-content: center;
        align-items: center;
    }
    .inner{
        flex: 1;
        width: 750px;
    }
</style>
