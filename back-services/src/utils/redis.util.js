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

// 获取数据
const getItem = (key) => new Promise(async (resolve, reject) => {
    const client = await connect();
    client.get(key, (err, data) => {
        if (err)
            return reject(err);
        try {
            resolve(JSON.parse(data));
        } catch (e) {
            resolve(data);
        }
    })
});

// 设置数据
const setItem = (key, value, expire) => new Promise(async (resolve, reject) => {
    try {
        if (typeof value === 'object')
            value = JSON.stringify(value);
        const client = await connect();
        if (expire) {
            return client.set(key, value, 'EX', expire, (err) => {
                return err ? reject(err) : resolve();
            })
        }
        return client.set(key, value, (err) => {
            return err ? reject(err) : resolve();
        })
    } catch (err) {
        reject(err);
    }
});


export default {
    connect,
    get,
}
