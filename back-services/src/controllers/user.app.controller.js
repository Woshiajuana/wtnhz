
import codeService          from '../services/code.service'
import mailService          from '../services/mail.service'
import userService          from '../services/user.service'

class Controller {

    // 登录
    async login (ctx, next) {
        try {
            let filterParams;
            let {
                email,
                captcha,
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
                    captcha: [],
                }
            });
            await userService.firewall(email, captcha);
            delete filterParams.captcha;
            let user = await userService.one(filterParams);
            if (!user) await userService.filterTimes(email, captcha);
            await userService.clearCaptcha(email);
            user.token = await userService.token(user._id);
            ctx.handle$.success(user);
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 获取图形验证码
    async captcha (ctx, next) {
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
            let code = await codeService.get(email);
            await mailService.send(email, 'WTNHZ', `您好，您的验证码为${code}，有效期为十分钟哦~`);
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

    // 查询
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
            let user = await userService.one(_id);
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
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: (value) => {
                                let len = value.length;
                                return len >= 2 && len <= 10;
                            },
                            prompt: '昵称长度为2~10个字符'
                        }
                    ],
                    avatar: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    sex: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: (value) => {
                                return ['1', '0'].indexOf(value) > -1;
                            },
                            prompt: '参数格式错误',
                        },
                    ],
                    autograph: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: (value) => {
                                return value.length <= 30;
                            },
                            prompt: '参数不能超过30个字符',
                        },
                    ],
                    followers: [],
                    following: [],
                }
            });
            await userService.update(filterParams);
            let user = await userService.one(filterParams._id);
            ctx.handle$.success(user);
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 修改密码
    async revise (ctx, next) {
        try {
            let {
                _id,
                newPassword,
                oldPassword,
            } = await ctx.check$.testBody((regular) => {
                return {
                    _id: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    newPassword: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: (value) => {
                                let len = value.length;
                                return len >= 6 && len <= 32;
                            },
                            prompt: '密码长度为6~32位'
                        },
                    ],
                    oldPassword: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: (value) => {
                                let len = value.length;
                                return len >= 6 && len <= 32;
                            },
                            prompt: '密码长度为6~32位'
                        },
                    ],
                }
            });
            let user = await userService.one({_id, password: oldPassword});
            if (!user)
                throw '旧密码错误';
            await userService.update({_id, password: newPassword});
            ctx.handle$.success();
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 找回密码
    async forgot (ctx, next) {
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
            await userService.update(filterParams);
            ctx.handle$.success();
        } catch (err) {
            ctx.handle$.error(err);
        }
    }
}

export default new Controller();
