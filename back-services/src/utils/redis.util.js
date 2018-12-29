import redis            from 'redis'

import config           from './../config/env.config'

const {
    REDIS
} = config;

let redisClient = null;

// 连接数据库
const connect = () => new Promise(async (resolve, reject) => {
    if (redisClient)
        return resolve(redisClient);
    try {
        const {
            host,
            port,
            db,
            family,
            pass,
        } = REDIS;
        const client = redis.createClient({ host, port, family, db });
        client.on('connect', () => {
            redisClient = client;
            resolve(client)
        });
        client.on('error', e => reject(e));
    } catch (e) {
        reject(e);
    }
});


export default {
    // 链接数据库
    connect,
}
