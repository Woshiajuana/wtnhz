

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
            let {
                email,
            } = await ctx.check$.testBody((regular) => {
                return {
                    email: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: regular.isEmail,
                            prompt: '参数格式错误',
                        },
                    ],
                }
            });
            let data = await userService.captcha(email);
            ctx.handle$.success(data);
        } catch (err) {
            ctx.handle$.error(err);
        }

    }

    // 详情
    async info (ctx, next) {
        try {
            let {
                email
            } = await ctx.check$.testBody((regular) => {
                return {
                    email: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: regular.isEmail,
                            prompt: '参数格式错误',
                        },
                    ]
                }
            });
            let code = await codeService.get(email);
            await mailService.send(email, 'WTNHZ', `您好，您的验证码为${code}，有效期为十分钟哦~`);
            ctx.handle$.success();
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 删除
    async remove (ctx, next) {
        try {
            let filterParams;
            let {
                email,
                code,
            } = filterParams = await ctx.check$.testBody((regular) => {
                return {
                    email: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: regular.isEmail,
                            prompt: '参数格式错误',
                        },
                    ],
                    code: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        }
                    ],
                    password: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: (value) => {
                                let len = value.length;
                                return len >= 6 && len <= 32;
                            },
                            prompt: '密码长度为6~32位',
                        }
                    ]
                }
            });
            await codeService.check(email, code);
            delete filterParams.code;
            let user = await userService.one(filterParams);
            if (user)
                throw '该邮箱已注册';
            await userService.create(filterParams);
            ctx.handle$.success();
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

}

export default new Controller();
