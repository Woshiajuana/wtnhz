

import userService          from '../services/user.service'
import postService          from '../services/post.service'
import themeService         from '../services/theme.service'

class Controller {

    // 发布
    async publish (ctx, next) {
        try {
            let filterParams;
            let {
                author,
                theme,
            } = filterParams = await ctx.check$.testBody((regular) => {
                return {
                    author: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    theme: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    content:  [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                }
            });
            let user = await userService.one(author);
            if (!user) throw '非法操作！';
            let theme = await themeService.one(theme);
            if (!theme) throw '标签错误！';
            await postService.create(filterParams);
            ctx.handle$.success();
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 获取列表
    async list (ctx, next) {
        try {
            let filterParams = await ctx.check$.testBody((regular) => {
                return {
                    pageIndex: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: (value) => {
                                return regular.isNumber(+value) && !isNaN(+value);
                            },
                            prompt: '参数格式错误',
                        },
                    ],
                    pageSize: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: (value) => {
                                return regular.isNumber(+value) && !isNaN(+value);
                            },
                            prompt: '参数格式错误',
                        },
                    ],
                }
            });
            let data = await postService.list(filterParams);
            ctx.handle$.success(data);
        } catch (err) {
            ctx.handle$.error(err);
        }

    }

    // 详情
    async info (ctx, next) {
        try {
            let {
                _id,
            } = await ctx.check$.testBody((regular) => {
                return {
                    _id: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                }
            });
            let data = await postService.one(_id);
            ctx.handle$.success(data);
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 删除
    async remove (ctx, next) {
        try {
            let {
                _id,
            } = await ctx.check$.testBody((regular) => {
                return {
                    _id: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                }
            });
            await postService.remove(_id);
            ctx.handle$.success();
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

}

export default new Controller();
