
import mongoose         from 'mongoose'

import config           from './../config/env.config'

const {
    MONGO_DB
} = config;

console.log(MONGO_DB);
// 连接数据库
const connect = () => new Promise(async (resolve, reject) => {
    try {
        const {
            host,
            port,
            db,
            options,
        } = MONGO_DB;
        await mongoose.connect(`mongodb://${host}:${port}/${db}`, options);
        resolve();
    } catch (e) {
        reject(e);
    }
});


export default {
    // 链接数据库
    connect,
}
