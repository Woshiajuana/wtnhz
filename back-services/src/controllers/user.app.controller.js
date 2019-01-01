
import CodeService          from '../services/code.service'
import MailService          from '../services/mail.service'
import UserService          from '../services/user.service'

class Controller {

    // 登录
    async login (ctx, next) {
        try {
            let filterParams = await ctx.check$.testBody((regular) => {
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
                        },
                    ],
                }
            });
            let user = await UserService.one(filterParams);
            if (!user)
                throw '账号密码错误';
            user.token = await UserService.token(user._id);
            ctx.handle$.success(user);
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 发送验证码
    async send (ctx, next) {
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
            let code = await CodeService.get(email);
            await MailService.send(email, 'WTNHZ', `您好，您的验证码为${code}，有效期为十分钟哦~`);
            ctx.handle$.success();
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 注册
    async register (ctx, next) {
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
            await CodeService.check(email, code);
            delete filterParams.code;
            let user = await UserService.one(filterParams);
            if (user)
                throw '该邮箱已注册';
            await UserService.create(filterParams);
            ctx.handle$.success();
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 查询
    async info (ctx, next) {
        try {
            let filterParams = await ctx.check$.testBody((regular) => {
                return {
                    _id: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                }
            });
            let user = await UserService.one(filterParams);
            if (!user)
                throw '该用户不存在';
            ctx.handle$.success(user);
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 更新
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
                    nickname: [
                        {
                            rule: (value) => {
                                let len = value.length;
                                return len >= 2 && len <= 10;
                            },
                            prompt: '昵称长度为2~10个字符'
                        }
                    ],
                    avatar: [],
                }
            });

            let user = await UserService.one({_id: filterParams._id});
            if (!user)
                throw '该用户不存在';
            user = await UserService.update(filterParams);
            ctx.handle$.success(user);
        } catch (err) {
            ctx.handle$.error(err);
        }
    }
}

export default new Controller();
