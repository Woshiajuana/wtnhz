
// 帖子表
import mongoose                 from 'mongoose'

const Schema = new mongoose.Schema({

    // 发帖人
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // 标题
    title: {
        type: String,
        trim: true,
    },

    // 主题
    theme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theme'
    },

    // 帖内容
    content: {
        type: String,
        trim: true,
    },

    // 创建信息
    datetime: {
        type: Date,
        default: Date.now,
    },

});

export default mongoose.model('Post', Schema);

export const select = 'author title theme content datetime';

export const listSelect = 'author title theme datetime';

export const populate = [
    { path: 'author', select: 'email nickname sex avatar autograph followers following' },
    'theme'
];
