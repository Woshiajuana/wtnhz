<template>
    <wow-view
        view_use_scroll=""
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
                placeholder-color="#dedede"
                :placeholder="item.placeholder"
            />
            <template v-else-if="item.mold === 'select'">
                <text
                    class="input"
                    :class="[!item.value && 'input-placeholder']"
                >{{item.value || item.placeholder}}</text>
                <wow-arrow
                    :arrow_style="{ borderColor: '#dedede' }"
                ></wow-arrow>
            </template>
            <textarea
                v-else-if="item.mold === 'textarea'"
                class="content"
                :row="3"
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
    import Mixin                        from './publish.mixin'

    const srcArr = [
        { key: 'close', value: 'header-left-close.png?6', },
    ];

    export default {
        mixins: [
            Mixin,
            InputMixin,
            SourceMixin,
        ],
        created () {
            this.sourceGet(srcArr);
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
    .textarea-box{
        border-bottom-width: 0;
    }
</style>
