
import CodeService          from '../services/code.service'

class Controller {
    async login (ctx, next) {
        console.log('login')
        next();
    }
    async send (ctx, next) {
        try {
            let errResult = ctx.check$.testBody((check) => {
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
            if (errResult)
                throw errResult;
            let {
                email
            } = ctx.check$.filterParams;
            let code = await CodeService.get(email);
            console.log(code);
            ctx.handle$.success({}, '发送验证码成功');
        } catch (err) {
            ctx.handle$.error(err);
        }
    }
    async register (ctx, next) {
        next();
    }
}

export default new Controller();
