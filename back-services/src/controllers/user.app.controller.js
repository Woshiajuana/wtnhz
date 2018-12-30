
import CodeService          from '../services/code.service'

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
            ctx.handle$.success({}, '发送验证码成功');
        } catch (err) {
            ctx.handle$.error(err);
        }
    }
    async register (ctx, next) {
        try {
            let {
                email,
                code,
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
                    ],
                    code: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        }
                    ]
                }
            });
            await CodeService.check(email, code);
            ctx.handle$.success({}, '注册成功');
        } catch (err) {
            ctx.handle$.error(err);
        }
    }
}

export default new Controller();
