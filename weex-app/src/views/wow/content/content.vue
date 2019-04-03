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
                @appear="reqPostCommentList"
                :data="objComment"
                @popup="objDoubleDeck.is = true"
            ></comment-section>
        </scroller>
        <operation-panel
            @submit="handleSubmit"
            @more="handleMore"
        ></operation-panel>
        <wow-action-sheet
            @change="handleChange"
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
    import UserMixin                    from 'mixins/user.mixin'
    import UserService                  from 'services/user.service'
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
            UserMixin,
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
                    options: {
                        yjdz: { text: '一键点赞' },
                        scwz: { text: '收藏文章' },
                        gzzz: { text: '关注作者' },
                        qxgz: { text: '取消关注' },
                    },
                },
                objDoubleDeck: {
                    is: false,
                },

                objComment: {
                    pageIndex: 0,
                    pageSize: 10,
                    total: 0,
                    list: [],
                },
            }
        },
        created () {
            // 获取用户信息
            this.userGet();
            // 获取URL参数
            this.routerGetParams();
            // 获取文章内容
            this.reqPostInfo();
            // 获取评论列表
            this.reqPostCommentList();
            // 查询关系
            this.reqFollowRelation();
        },
        methods: {
            // 更多操作
            handleMore () {
                if (!this.user$)
                    return UserService.login();
                this.actionSheet.is = true;
            },
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
                    total,
                } = this.objComment;
                if (pageIndex !== 0 && total === list.length)
                    return null;
                if (list.length % 10 === 0)
                    pageIndex++;
                if (total < 10)
                    pageIndex = 1;
                Http(Api.reqPostCommentList, {
                    pageIndex,
                    pageSize,
                    post: this.params$._id,
                }, {
                    useToken: false,
                    loading: false,
                }).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    if (pageIndex === 1) {
                        return this.objComment = data;
                    } else {
                        this.objComment.pageIndex = data.pageIndex;
                        this.objComment.total = data.total;
                        this.commentFilter(data.list);
                    }
                }).catch((err) => {
                    Dialogs.toast(err);
                })
            },
            // 过滤数据
            commentFilter (data) {
                data.forEach((item) => {
                    let type = true;
                    for (let i = 0; i < this.objComment.list.length; i++) {
                        if (item._id === this.objComment.list[i]._id) {
                            type = false;
                            break;
                        }
                    }
                    if (type) this.objComment.list.push(item);
                })
            },
            // 发布评论
            handleSubmit ({value, callback}) {
                Http(Api.doPostCommentPublish, {
                    post: this.params$._id,
                    content: value,
                }).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    this.objComment.total++;
                    this.reqPostCommentList();
                    callback();
                }).catch((err) => {
                    Dialogs.toast(err);
                })
            },
            // 操作
            handleChange ({text}) {
                if (text === '关注作者')
                    return this.doFollow(true);
                if (text === '取消关注')
                    return this.doFollow(false);
            },
            // 获取与该文章作者的关系
            reqFollowRelation () {
                if (this.user$._id === this.params$.author._id) {
                    delete this.actionSheet.options.gzzz;
                    delete this.actionSheet.options.qxgz;
                    delete this.actionSheet.options.scwz;
                    return null;
                }
                Http(Api.reqFollowRelation, {
                    id: this.params$.author._id,
                }).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    let { follower } = data;
                    follower
                        ? delete this.actionSheet.options.gzzz
                        : delete this.actionSheet.options.qxgz;
                }).catch((err) => {
                    Dialogs.toast(err);
                })
            },
            // 关注 or 取消关注
            doFollow (type) {
                let url = type
                    ? Api.doFollowCreate
                    : Api.doFollowRemove;
                Http(url, {
                    id: this.params$.author._id,
                }).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    this.actionSheet.is = false;
                    this.reqFollowRelation();
                    Dialogs.toast('操作成功');
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
