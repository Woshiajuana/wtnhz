<template>
    <div class="wrap">
        <image class="image" src="https://img.mukewang.com/5c6d3e4e0001946418720632.jpg"></image>
        <input type="text" v-model="value" class="input" placeholder="说说你的看法..."/>
        <div class="button">
            <text class="button-text">发布</text>
        </div>
    </div>
</template>

<script>
    import EmitMixin                    from 'wow-weex-ui/mixins/emit.mixin'

    export default {
        mixins: [
            EmitMixin
        ],
        data () {
            return {
                value: ''
            }
        },
        props: {
            data: { default: {} },
        }
    }
</script>

<style>
    .wrap{
        width: 750px;
        height: 100px;
        border-color: #dedede;
        border-top-width: 1px;
        flex-direction: row;
        align-items: center;
    }
    .input{
        flex: 1;
        height: 68px;
        border-color: #dedede;
        border-bottom-width: 1px;
        font-size: 28px;
        color: #333;
    }
    .image{
        width: 68px;
        height: 68px;
        border-radius: 68px;
        margin-right: 16px;
        margin-left: 32px;
    }
    .button{
        justify-content: center;
        align-items: center;
        padding-left: 16px;
        padding-right: 16px;
        margin-right: 16px;
        margin-left: 16px;
        height: 68px;
        border-radius: 8px;
        background-color: #fc5366;
    }
    .button:active{
        background-color: #dedede;
    }
    .button-text{
        font-size: 28px;
        color: #fff;
    }
</style>
