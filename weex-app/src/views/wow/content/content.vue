<template>
    <wow-view
        :view_header_right_src="src$.more"
        :view_header_center_txt="computedTitle">
        <scroller class="main">
            <div class="header">
                <text class="title"
                      @appear="handleAppear"
                      @disappear="handleDisappear"
                >{{params$.title}}</text>
                <div class="user">
                    <image
                        class="image"
                        :src="params$.author && params$.author.avatar"
                    ></image>
                    <text class="name">{{params$.author && params$.author.name}}</text>
                    <text class="time">{{params$.time}}</text>
                </div>
                <div class="info">
                    <div class="info-item">
                        <image class="info-icon" :src="src$.give"></image>
                        <text class="info-text">{{params$.praise}}</text>
                    </div>
                    <div class="info-item">
                        <image class="info-icon" :src="src$.msg"></image>
                        <text class="info-text">{{params$.comment}}</text>
                    </div>
                    <div class="info-item">
                        <image class="info-icon" :src="src$.collect"></image>
                        <text class="info-text">{{params$.collect}}</text>
                    </div>
                </div>
            </div>
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
        <operation-panel></operation-panel>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import RouterMixin                  from 'mixins/router.mixin'
    import SourceMixin                  from 'mixins/source.mixin'
    import { filterCutOut }             from 'mixins/filter.mixin'
    import OperationPanel               from './components/operation-panel.vue'

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
            }
        },
        created () {
            this.sourceGet(srcArr);
            this.routerGetParams();
        },
        methods: {
            handleAppear () {
                this.isAppear = true;
            },
            handleDisappear () {
                this.isAppear = false;
            },
        },
        components: {
            WowView,
            OperationPanel,
        },
    }
</script>

<style>
    .main{
        flex: 1;
    }
    .header{
        align-items: center;
        padding-top: 60px;
        padding-bottom: 60px;
        padding-left: 100px;
        padding-right: 100px;
    }
    .title{
        text-align: center;
        color: #000;
        font-size: 48px;
        line-height: 70px;
    }
    .user{
        margin-top: 36px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .image{
        width: 42px;
        height: 42px;
        border-radius: 42px;
        margin-right: 16px;
    }
    .name{
        font-size: 24px;
        line-height: 44px;
        color: #999;
        margin-right: 32px;
    }
    .time{
        font-size: 24px;
        line-height: 44px;
        color: #999;
    }
    .info{
        margin-top: 36px;
        flex-direction: row;
        align-items: center;
    }
    .info-item{
        flex-direction: row;
        align-items: center;
        margin-right: 20px;
        margin-left: 20px;
    }
    .info-item:active{
        background-color: #f2f2f2;
    }
    .info-icon{
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
    .info-text{
        font-size: 22px;
        color: #999;
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
