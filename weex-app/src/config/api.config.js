

export default {
    // 注册
    doUserRegister: '/app/user/register',

    // 发送验证码
    doFetchVerifyCode: '/app/user/send',

    // 登录
    doUserLogin: '/app/user/login',

    // 刷新图形验证码
    doRefreshCaptcha: '/app/user/captcha',

    // 找回密码
    doUserForgot: '/app/user/forgot',

    // 上传图片
    doUploadPicture: '/app/upload/base64',

    // 修改用户信息
    doUpdateUserInfo: '/app/user/update',

    // 获取用户信息
    reqUserInfo: '/app/user/info',

    // 获取主题列表
    reqThemeList: '/app/post/theme/list',

    // 发布文章
    doPostPublish: '/app/post/publish',

    // 文章详情
    reqPostInfo: '/app/post/info',

    // 获取文章列表
    reqPostList: '/app/post/list',

    // 评论文章
    doPostCommentPublish: '/app/post/comment/publish',

    // 评论列表
    reqPostCommentList: '/app/post/comment/list',

    // 关注
    doFollowCreate: '/app/follow/create',

    // 取消关注
    doFollowRemove: '/app/follow/remove',

    // 查询粉丝
    reqFollowRelation: '/app/follow/relation',

    // 粉丝列表
    reqFollowersList: '/app/follow/followers',

    // 关注列表
    reqFollowingList: '/app/follow/following',

}
