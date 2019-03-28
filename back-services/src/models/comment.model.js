

// 评论表

import mongoose                 from 'mongoose'

const Schema = new mongoose.Schema({

    // 主题帖
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post' //这里要写你指向的数据库表名字
    },

    // 内容
    content: {

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
