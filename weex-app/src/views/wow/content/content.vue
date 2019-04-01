<template>
    <wow-view
        :view_header_wrap_style="{ borderBottomWidth: isAppear ? 0 : 1 }"
        :view_header_center_txt="computedTitle">
        <scroller class="main">
            <head-section
                @appear="isAppear = true"
                @disappear="isAppear = false"
                :data="params$"
            ></head-section>
            <content-section
                :data="params$.content"
            ></content-section>
            <comment-section
                :data="objComment"
                @popup="objDoubleDeck.is = true"
            ></comment-section>
        </scroller>
        <operation-panel
            @submit="handleSubmit"
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
    import Http                         from 'plugins/http.plugin'
    import Dialogs                      from 'plugins/dialogs.plugin'
    import Api                          from 'config/api.config'
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
                },

                objComment: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0,
                    list: [],
                },
            }
        },
        created () {
            // 获取URL参数
            this.routerGetParams();
            // 获取文章内容
            this.reqPostInfo();
            // 获取文章评论
            this.reqPostCommentList();
        },
        methods: {
            // 获取文章内容
            reqPostInfo () {
                Http(Api.reqPostInfo, {
                    id: this.params$._id,
                }, {
                    useToken: false,
                }).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    this.params$ = {
                        ...this.params$,
                        ...data,
                    };
                }).catch((err) => {
                    Dialogs.toast(err);
                })
            },
            // 获取文章评论列表
            reqPostCommentList () {
                let {
                    pageIndex,
                    pageSize,
                    list,
                } = this.objComment;
                Http(Api.reqPostCommentList, {
                    pageIndex,
                    pageSize,
                    post: this.params$._id,
                }, {
                    useToken: false,
                }).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    if (pageIndex === 1) {
                        return this.objComment = data;
                    } else {
                        this.objComment.list = [...list, ...data.list];
                    }
                }).catch((err) => {
                    Dialogs.toast(err);
                })
            },
            // 发布评论
            handleSubmit (content) {
                let {
                    pageIndex,
                    pageSize,
                    list,
                } = this.objComment;
                Http(Api.reqPostCommentList, {
                    pageIndex,
                    pageSize,
                    post: this.params$._id,
                }, {
                    useToken: false,
                }).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    if (pageIndex === 1) {
                        return this.objComment = data;
                    } else {
                        this.objComment.list = [...list, ...data.list];
                    }
                }).catch((err) => {
                    Dialogs.toast(err);
                })
            },
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
