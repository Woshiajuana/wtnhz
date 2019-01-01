
import jwt                  from 'jsonwebtoken'
import redisUtil            from '../utils/redis.util'

const verify = (token, secret) => new Promise((resolve) => {
    jwt.verify(token, secret, (err, decoded) => {
        err ? resolve({}) : resolve(decoded)
    })
});

class Controller {
    async check (ctx, next) {
        try {
            let {
                token
            } = await ctx.check$.testBody((regular) => {
                return {
                    token: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                }
            });
            let {
                _id,
            } = await verify(token, 'user');
            const reply = await redisUtil.getItem(token);
            if (reply !== _id)
                throw '无效token，请重新登录';
            ctx.request.body._id = _id;
            await next();
        } catch (err) {
            ctx.handle$.error(err);
        }
    }
}

export default new Controller();
