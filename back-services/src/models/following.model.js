
// 关注表

import mongoose                 from 'mongoose'

const Schema = new mongoose.Schema({

    // 被关注的人
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //这里要写你指向的数据库表名字
    },

    // 关注的人
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //这里要写你指向的数据库表名字
    },

    // 创建信息
    datetime: {
        type: Date,
        default: Date.now,
    },

});

export default mongoose.model('Following', Schema);

export const select = 'following follower datetime';

export const populate = [
    { path: 'following', select: 'email nickname sex avatar autograph followers following' },
    { path: 'follower', select: 'email nickname sex avatar autograph followers following' },
];
