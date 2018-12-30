
import RedisUtil            from '../utils/redis.util'

class Controller {
    async login (ctx, next) {
        console.log('login')
        next();
    }
    async send (ctx, next) {
        try {
            let result = ctx.check$.testBody((check) => {
                return {
                    email: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: check.isEmail,
                            prompt: '邮箱输入错误',
                        },
                    ]
                }
            });
            if (result)
                throw result;
            ctx.handle$.success({}, '操作成功');
        } catch (err) {
            ctx.handle$.error(err);
        }
    }
    async register (ctx, next) {
        next();
    }
}

export default new Controller();
