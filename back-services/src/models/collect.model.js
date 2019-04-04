
// 粉丝表

import mongoose                 from 'mongoose'

const Schema = new mongoose.Schema({

    // 收藏的文章
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post' //这里要写你指向的数据库表名字
    },

    // 搜藏的用户
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //这里要写你指向的数据库表名字
    },

    // 创建信息
    datetime: {
        type: Date,
        default: Date.now,
    },

});

export default mongoose.model('Collect', Schema);

export const select = 'post user datetime';

export const populate = [
    { path: 'post', select: 'author title theme datetime' },
    { path: 'user', select: 'email nickname sex avatar autograph followers following' },
];
