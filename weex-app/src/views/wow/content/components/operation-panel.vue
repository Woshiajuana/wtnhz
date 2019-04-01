<template>
    <div class="wrap">
        <input
            type="text"
            v-model="value"
            class="input"
            placeholder="说说你的看法..."
        />
        <div class="button-box">
            <div class="button sub-button"
                 @click="handleSubmit"
                 :style="{visibility: !use_more || value ? 'visible' : 'hidden'}">
                <text class="button-text">发布</text>
            </div>
            <div class="button"
                 v-if="use_more"
                 @click="emitEvent('more')"
                 :style="{visibility: value ? 'hidden' : 'visible'}">
                <image class="icon" :src="src$.more"></image>
            </div>
        </div>
    </div>
</template>

<script>
    import EmitMixin                    from 'mixins/emit.mixin'
    import SourceMixin                  from 'mixins/source.mixin'
    const srcArr = [
        { key: 'more', value: 'more-icon-fc5366.png', },
    ];

    export default {
        mixins: [
            EmitMixin,
            SourceMixin,
        ],
        data () {
            return {
                value: ''
            }
        },
        created () {
            this.sourceGet(srcArr);
        },
        methods: {
            handleSubmit () {
                this.emitEvent('submit', {
                    value: this.value,
                    callback: () => {
                        this.value = '';
                    },
                })
            }
        },
        props: {
            data: { default: {} },
            use_more: { default: true },
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
        padding-left: 32px;
    }
    .input{
        flex: 1;
        height: 68px;
        font-size: 28px;
        color: #333;
    }
    .button-box{
        margin-right: 16px;
        margin-left: 16px;
        width: 100px;
        height: 68px;
    }
    .button{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
    }
    .sub-button{
        background-color: #fc5366;
    }
    .button:active{
        background-color: #dedede;
    }
    .button-text{
        font-size: 28px;
        color: #fff;
    }
    .icon{
        width: 48px;
        height: 48px;
    }
</style>
