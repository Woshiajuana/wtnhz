<template>
    <div class="wrap">
        <div class="inner">
            <div class="option"
                 :class="[index === 0 && 'first-child',
                 index === arrOptions.length - 1 && 'last-child']"
                 v-for="(item, index) in arrOptions"
                 :key="index">
                <image class="image"></image>
                <text class="text">{{item.text}}</text>
            </div>
        </div>
        <div class="option button">
            <text class="button-text">取消</text>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                arrOptions: [
                    { src: '', text: '拍照' },
                    { src: '', text: '相册' },
                    { src: '', text: '相册' },
                ]
            }
        }
    }
</script>

<style>
    .wrap{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .3);
        justify-content: flex-end;
        align-items: center;
    }
    .inner{
        border-radius: 16px;
        overflow: hidden;
    }
    .first-child{
        border-top-right-radius: 16px;
        border-top-left-radius: 16px;
    }
    .last-child{
        border-bottom-right-radius: 16px;
        border-bottom-left-radius: 16px;
    }
    .option{
        justify-content: center;
        align-items: center;
        width: 710px;
        height: 100px;
        background-color: #fff;
        border-color: #dedede;
        margin-bottom: 1px;
    }
    .option:active{
        background-color: #dedede;
    }
    .image{

    }
    .text{
        font-size: 32px;
        color: #333;
    }
    .button{
        margin-top: 20px;
        border-radius: 16px;
        margin-bottom: 20px;
    }
    .button-text{
        font-size: 32px;
        color: #999;
    }
</style>
