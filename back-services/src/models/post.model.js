
// 帖子表

import mongoose                 from 'mongoose'

const Schema = new mongoose.Schema({

    // 发帖人
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // 主题
    theme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theme'
    },

    // 内容
    content: {
        type: String,
        trim: true,
    },

    // 创建信息
    create: {
        // 时间
        date: {
            type: Date,
            default: Date.now,
        },
    },

});

export default mongoose.model('Post', Schema);