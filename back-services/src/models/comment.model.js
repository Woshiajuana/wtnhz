

// 评论表

import mongoose                 from 'mongoose'

const Schema = new mongoose.Schema({

    // 主题帖
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post' //这里要写你指向的数据库表名字
    },

    // 评论人
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // 评论内容
    content: {
        type: String,
        trim: true,
    },

    // 楼层
    floor: {
        type: String,
        trim: true,
    },

    // 创建信息
    datetime: {
        type: Date,
        default: Date.now,
    },

    // 回复
    reply: [
        {
            // 作者
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            // 评论内容
            content: {
                type: String,
                trim: true,
            },
            // 时间
            datetime: {
                type: Date,
                default: Date.now,
            },
            // 回复
            reply: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
        },

    ]

});

export default mongoose.model('Comment', Schema);
