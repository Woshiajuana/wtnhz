
import mongoose         from 'mongoose'

import {
    MONGO_DB,
}                       from './../config/env.config'

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
    } catch (e) {
        reject(e);
    }
});


export default {
    // 链接数据库
    connect,
}
