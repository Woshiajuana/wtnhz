
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

    // 列表
    async list (ctx, next) {
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
}

export default new Controller();
