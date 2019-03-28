

// 主题表

import mongoose                 from 'mongoose'

const Schema = new mongoose.Schema({

    // 主题名
    name: {
        type: String,
        unique: true,
        trim: true,
    },

    // 日期时间
    datetime: {
        type: Date,
        default: Date.now,
    },

});

export default mongoose.model('Theme', Schema);

export const select = 'name datetime';
