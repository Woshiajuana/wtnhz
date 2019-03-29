

import userService          from '../services/user.service'
import commentService       from '../services/comment.service'

class Controller {

    // 发布
    async publish (ctx, next) {
        try {
            let filterParams;
            let {
                author,
            } = filterParams = await ctx.check$.testBody((regular) => {
                return {
                    post: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    author: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    content: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                }
            });
            if (!await userService.one(author))
                throw '非法操作！';
            await commentService.create(filterParams);
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
            let data = await commentService.list(filterParams);
            ctx.handle$.success(data);
        } catch (err) {
            ctx.handle$.error(err);
        }

    }

    // 详情
    async info (ctx, next) {
        try {
            let {
                id,
            } = await ctx.check$.testBody((regular) => {
                return {
                    id: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                }
            });
            let data = await commentService.one(id);
            ctx.handle$.success(data);
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 删除
    async remove (ctx, next) {
        try {
            let {
                id,
            } = await ctx.check$.testBody((regular) => {
                return {
                    id: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                }
            });
            await commentService.remove(id);
            ctx.handle$.success();
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 回复
    async reply (ctx, next) {
        try {
            let {
                author,
                content,
                reply,
                id,
            } = await ctx.check$.testBody((regular) => {
                return {
                    id: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    author: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    content: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    reply: [],
                }
            });
            if (!await userService.one(author))
                throw '非法操作！';
            let comment = await commentService.one(id);
            if (!comment)
                throw '非法操作！';
            comment.reply.push({
                author,
                content,
                reply,
            });
            await commentService.update(comment);
            ctx.handle$.success();
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

}

export default new Controller();
