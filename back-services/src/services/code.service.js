
import redisUtil            from '../utils/redis.util'
import commonUtil           from '../utils/common.util'

export default {

    // get code
    get: (email, len = 6) => new Promise(async (resolve, reject) =>  {
        try {
            let code = commonUtil.randomNum(len);
            await redisUtil.setItem(email, code, 10 * 60);
            return resolve(code)
        } catch (err) {
            reject(err);
        }
    }),

    // check code
    check: (email, code) => new Promise(async (resolve, reject) =>  {
        try {
            let data = await redisUtil.getItem(email);
            if (code !== data.toString())
                return reject(`验证码错误`);
            await redisUtil.setItem(email, '', 0);
            return resolve(data);
        } catch (err) {
            reject(err);
        }
    }),
}
