<template>
    <wow-view
        :view_header_style="{position: 'fixed', backgroundColor: 'transparent'}">
        <div class="user"></div>
    </wow-view>
</template>

<script>
    import WowView                      from 'components/wow-weex-ui/lib/wow-view'



    export default {
        components: {
            WowView,
        },
    }
</script>

<style>
    .user{
        background-color: #000;
        height: 200px;
    }
</style>
