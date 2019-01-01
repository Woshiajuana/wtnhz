
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
            console.log(1)
            let {
                _id,
            } = await verify(token, 'user');
            console.log(2)
            const reply = await redisUtil.getItem(token);
            console.log(3)
            if (reply !== _id)
                throw '无效token，请重新登录';
            console.log(4)
            console.log(_id)
            ctx.request.body._id = _id;
            await next();
        } catch (err) {
            ctx.handle$.error(err);
        }
    }
}

export default new Controller();
