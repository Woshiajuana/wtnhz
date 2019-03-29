
import themeService         from '../services/theme.service'

class Controller {

    // 新增
    async create (ctx, next) {
        try {
            let filterParams = await ctx.check$.testBody((regular) => {
                return {
                    name: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: (value) => {
                                let len = value.length;
                                return len >= 2 && len <= 10;
                            },
                            prompt: '长度为2~10位',
                        },
                    ],
                }
            });
            await themeService.create(filterParams);
            ctx.handle$.success();
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 查看
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
            let theme = await themeService.one(_id);
            ctx.handle$.success(theme);
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
            let theme = await themeService.remove(_id);
            ctx.handle$.success(theme);
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 更新页面
    async update (ctx, next) {
        try {
            let filterParams = await ctx.check$.testBody((regular) => {
                return {
                    _id: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    name: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: (value) => {
                                let len = value.length;
                                return len >= 2 && len <= 10;
                            },
                            prompt: '长度为2~10位',
                        },
                    ],
                }
            });
            let theme = await themeService.update(filterParams);
            ctx.handle$.success(theme);
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 列表
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
                            rule: regular.isNumber,
                            prompt: '参数格式错误',
                        },
                    ],
                    pageSize: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: regular.isNumber,
                            prompt: '参数格式错误',
                        },
                    ],
                }
            });
            let result = await themeService.list(filterParams);
            ctx.handle$.success(result);
        } catch (err) {
            ctx.handle$.error(err);
        }
    }
}

export default new Controller();
