
import RedisUtil            from '../utils/redis.util'


export default {

    // get code
    get: (email, max) => new Promise(async (resolve, reject) =>  {
        try {
            const redisClient = await RedisUtil.connect();
            let code = '112233';
            redisClient.set(email, code, (err) => {
                err ? reject(err) : resolve(code)
            });
        } catch (err) {
            reject(err);
        }
    }),

    // check code
    check: (email, code) => new Promise(async (resolve, reject) =>  {
        try {
            const redisClient = await RedisUtil.connect();
            redisClient.get(email, (err, data) => {
                err ? reject(err) : code !== data ? reject(`验证码错误`) : resolve(data)
            });
        } catch (err) {
            reject(err);
        }
    }),
}