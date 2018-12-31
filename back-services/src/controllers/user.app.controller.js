
import CodeService          from '../services/code.service'
import MailService          from '../services/mail.service'
import UserService          from '../services/user.service'

class Controller {
    async login (ctx, next) {
        console.log('login')
        next();
    }
    async send (ctx, next) {
        try {
            let {
                email
            } = await ctx.check$.testBody((check) => {
                return {
                    email: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: check.isEmail,
                            prompt: '参数格式错误',
                        },
                    ]
                }
            });
            let code = await CodeService.get(email);
            await MailService.send(email, '注册验证码', `验证码为${code}`);
            ctx.handle$.success({}, '发送验证码成功');
        } catch (err) {
            ctx.handle$.error(err);
        }
    }
    async register (ctx, next) {
        try {
            let filterParams;
            let {
                email,
                code,
            } = filterParams = await ctx.check$.testBody((check) => {
                return {
                    email: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: check.isEmail,
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
            await UserService.create(filterParams);
            ctx.handle$.success({}, '注册成功');
        } catch (err) {
            ctx.handle$.error(err);
        }
    }
}

export default new Controller();
