
import jwt                  from 'jsonwebtoken'
import redisUtil            from '../utils/redis.util'


class Controller {
    async check (ctx, next) {
        try {
            let filterParams = await ctx.check$.testBody((regular) => {
                return {
                    _id: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    token: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                }
            })
        } catch (err) {
            ctx.handle$.error(err);
        }
    }
}

export default new Controller();
