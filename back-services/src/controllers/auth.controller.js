
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
            let user = await verify(token, 'user');
            console.log('user', user);
            const reply = await redisUtil.getItem(token);
            console.log('reply', reply);
            if (reply !== user._id)
                throw '无效token，请重新登录';
            await next();
        } catch (err) {
            ctx.handle$.error(err);
        }
    }
}

export default new Controller();
