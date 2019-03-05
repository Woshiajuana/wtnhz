<template>
    <wow-view
        :view_header_center_txt="computedTitle">
        <scroller class="main">
            <head-section
                @appear="isAppear = true"
                @disappear="isAppear = false"
                :data="params$"
            ></head-section>
            <div class="content">
                <text class="text">weexPageB是由weexPageA页面push过来的，已经脱离了viewWillAppear的控制（我在xcode里面打的断点，监测，在渲染weexPageB时，viewWillAppear并没有触发），在nativePageB页面pop的weexPageB时，顶部就会出现原生的导航栏。</text>
                <text class="text">weexPageB是由weexPageA页面push过来的，已经脱离了viewWillAppear的控制（我在xcode里面打的断点，监测，在渲染weexPageB时，viewWillAppear并没有触发），在nativePageB页面pop的weexPageB时，顶部就会出现原生的导航栏。</text>
                <text class="text">weexPageB是由weexPageA页面push过来的，已经脱离了viewWillAppear的控制（我在xcode里面打的断点，监测，在渲染weexPageB时，viewWillAppear并没有触发），在nativePageB页面pop的weexPageB时，顶部就会出现原生的导航栏。</text>
                <text class="text">weexPageB是由weexPageA页面push过来的，已经脱离了viewWillAppear的控制（我在xcode里面打的断点，监测，在渲染weexPageB时，viewWillAppear并没有触发），在nativePageB页面pop的weexPageB时，顶部就会出现原生的导航栏。</text>
                <text class="text">weexPageB是由weexPageA页面push过来的，已经脱离了viewWillAppear的控制（我在xcode里面打的断点，监测，在渲染weexPageB时，viewWillAppear并没有触发），在nativePageB页面pop的weexPageB时，顶部就会出现原生的导航栏。</text>
                <text class="text">weexPageB是由weexPageA页面push过来的，已经脱离了viewWillAppear的控制（我在xcode里面打的断点，监测，在渲染weexPageB时，viewWillAppear并没有触发），在nativePageB页面pop的weexPageB时，顶部就会出现原生的导航栏。</text>
                <text class="text">weexPageB是由weexPageA页面push过来的，已经脱离了viewWillAppear的控制（我在xcode里面打的断点，监测，在渲染weexPageB时，viewWillAppear并没有触发），在nativePageB页面pop的weexPageB时，顶部就会出现原生的导航栏。</text>
                <text class="text">weexPageB是由weexPageA页面push过来的，已经脱离了viewWillAppear的控制（我在xcode里面打的断点，监测，在渲染weexPageB时，viewWillAppear并没有触发），在nativePageB页面pop的weexPageB时，顶部就会出现原生的导航栏。</text>
                <text class="text">weexPageB是由weexPageA页面push过来的，已经脱离了viewWillAppear的控制（我在xcode里面打的断点，监测，在渲染weexPageB时，viewWillAppear并没有触发），在nativePageB页面pop的weexPageB时，顶部就会出现原生的导航栏。</text>
                <text class="text">weexPageB是由weexPageA页面push过来的，已经脱离了viewWillAppear的控制（我在xcode里面打的断点，监测，在渲染weexPageB时，viewWillAppear并没有触发），在nativePageB页面pop的weexPageB时，顶部就会出现原生的导航栏。</text>
                <text class="text">weexPageB是由weexPageA页面push过来的，已经脱离了viewWillAppear的控制（我在xcode里面打的断点，监测，在渲染weexPageB时，viewWillAppear并没有触发），在nativePageB页面pop的weexPageB时，顶部就会出现原生的导航栏。</text>
                <text class="text">weexPageB是由weexPageA页面push过来的，已经脱离了viewWillAppear的控制（我在xcode里面打的断点，监测，在渲染weexPageB时，viewWillAppear并没有触发），在nativePageB页面pop的weexPageB时，顶部就会出现原生的导航栏。</text>
                <text class="text">weexPageB是由weexPageA页面push过来的，已经脱离了viewWillAppear的控制（我在xcode里面打的断点，监测，在渲染weexPageB时，viewWillAppear并没有触发），在nativePageB页面pop的weexPageB时，顶部就会出现原生的导航栏。</text>
                <text class="text">weexPageB是由weexPageA页面push过来的，已经脱离了viewWillAppear的控制（我在xcode里面打的断点，监测，在渲染weexPageB时，viewWillAppear并没有触发），在nativePageB页面pop的weexPageB时，顶部就会出现原生的导航栏。</text>
            </div>
        </scroller>
        <operation-panel
            @more="actionSheet.is = true"
        ></operation-panel>
        <wow-action-sheet
            @close="actionSheet.is = false"
            v-if="actionSheet.is"
            :action_options="actionSheet.options"
        ></wow-action-sheet>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowActionSheet               from 'components/wow-weex-ui/lib/wow-action-sheet'
    import RouterMixin                  from 'mixins/router.mixin'
    import SourceMixin                  from 'mixins/source.mixin'
    import { filterCutOut }             from 'mixins/filter.mixin'
    import OperationPanel               from './components/operation-panel.vue'
    import HeadSection                  from './components/head-section.vue'

    const srcArr = [
        { key: 'give_active', value: 'give-icon-fc5366.png', },
        { key: 'give', value: 'give-icon-999.png', },
        { key: 'collect', value: 'collect-icon-999.png', },
        { key: 'collect_active', value: 'collect-icon-fc5366.png', },
        { key: 'msg', value: 'msg-icon-999.png', },
        { key: 'more', value: 'more-icon-fc5366.png', },
    ];

    export default {
        mixins: [
            RouterMixin,
            SourceMixin,
        ],
        computed: {
            computedTitle () {
                return this.isAppear
                    ? ''
                    : filterCutOut(this.params$.title, 10);
            }
        },
        data () {
            return {
                isAppear: true,
                actionSheet: {
                    is: false,
                    options: [
                        { text: '一键点赞' },
                        { text: '收藏文章' },
                        { text: '关注作者' },
                    ],
                },
            }
        },
        created () {
            this.sourceGet(srcArr);
            this.routerGetParams();
        },
        methods: {

        },
        components: {
            WowView,
            HeadSection,
            OperationPanel,
            WowActionSheet,
        },
    }
</script>

<style>
    .main{
        flex: 1;
    }
    .content{
        padding-left: 32px;
        padding-right: 32px;
        padding-bottom: 32px;
    }
    .text{
        line-height: 44px;
        font-size: 28px;
        color: #333;
    }
</style>
