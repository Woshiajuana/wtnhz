<template>
    <div class="wrap">
        <text class="text">weexPageB是由weexPageA页面push过来的，已经脱离了viewWillAppear的控制（我在xcode里面打的断点，监测，在渲染weexPageB时，viewWillAppear并没有触发），在nativePageB页面pop的weexPageB时，顶部就会出现原生的导航栏。</text>
        <text class="text">weexPageB是由weexPageA页面push过来的，已经脱离了viewWillAppear的控制（我在xcode里面打的断点，监测，在渲染weexPageB时，viewWillAppear并没有触发），在nativePageB页面pop的weexPageB时，顶部就会出现原生的导航栏。</text>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    .wrap{
        padding-left: 32px;
        padding-right: 32px;
        padding-bottom: 32px;
        background-color: #fff;
        border-bottom-width: 1px;
        border-color: #dedede;
    }
    .text{
        line-height: 44px;
        font-size: 28px;
        color: #333;
    }
</style>
