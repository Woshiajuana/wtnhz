<template>
    <wow-view
        :view_header_wrap_style="{borderBottomWidth: isAppear ? 0 : 1}"
        :view_header_center_txt="computedTitle">
        <scroller class="main">
            <head-section
                @appear="isAppear = true"
                @disappear="isAppear = false"
                :data="params$"
            ></head-section>
            <content-section></content-section>
            <comment-section
                @popup="objDoubleDeck.is = true"
            ></comment-section>
        </scroller>
        <operation-panel
            @more="actionSheet.is = true"
        ></operation-panel>
        <wow-action-sheet
            @close="actionSheet.is = false"
            v-if="actionSheet.is"
            :action_options="actionSheet.options"
        ></wow-action-sheet>
        <comment-popup
            @close="objDoubleDeck.is = false"
            v-if="objDoubleDeck.is"
        ></comment-popup>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowActionSheet               from 'components/wow-weex-ui/lib/wow-action-sheet'
    import RouterMixin                  from 'mixins/router.mixin'
    import { filterCutOut }             from 'mixins/filter.mixin'
    import OperationPanel               from './components/operation-panel.vue'
    import HeadSection                  from './components/head-section.vue'
    import ContentSection               from './components/content-section.vue'
    import CommentSection               from './components/comment-section.vue'
    import CommentPopup                 from './components/comment-popup.vue'

    export default {
        mixins: [
            RouterMixin,
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
                objDoubleDeck: {
                    is: false,

                }
            }
        },
        created () {
            this.routerGetParams();
        },
        methods: {

        },
        components: {
            WowView,
            HeadSection,
            OperationPanel,
            ContentSection,
            CommentSection,
            CommentPopup,
            WowActionSheet,
        },
    }
</script>

<style>
    .main{
        flex: 1;
        background-color: #f2f2f2;
    }
</style>
