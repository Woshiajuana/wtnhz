
import RedisUtil            from '../utils/redis.util'

function randomNum (len) {
    let result = '';
    while (len > 0) {
        len--;
        result += Math.floor(Math.random() * 10)
    }
    return result;
}

export default {

    // get code
    get: (email, max) => new Promise(async (resolve, reject) =>  {
        try {
            const redisClient = await RedisUtil.connect();
            let code = randomNum(6);
            redisClient.set(email, code, (err) => {
                redisClient.expire(email, 10 * 60);
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
