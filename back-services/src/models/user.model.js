
// 用户表

import mongoose                 from 'mongoose'

const Schema = new mongoose.Schema({

    // 邮箱
    email: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true,
        match: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    },

    // 密码
    password: {
        type: String,
        required: true,
    },

    // 昵称
    nickname: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 20,
    },

    // 性别  '1' 男， '0' 女，
    sex: {
        type: String,
        trim: true,
        default: '1',
    },

    // 头像
    avatar: {
        type: String,
        trim: true,
    },

    // 个性签名
    autograph: {
        type: String,
        trim: true,
        maxlength: 30,
    },

    // 粉丝
    followers: {
        type: String,
        trim: true,
        default: '0',
    },

    // 关注
    following: {
        type: String,
        trim: true,
        default: '0',
    },

    // 注册信息
    create: {
        // 时间
        date: {
            type: Date,
            default: Date.now,
        },
        // 地点
        address: {
            type: String,
            trim: true,
        },
        // IP
        ip: {
            type: String,
            trim: true,
            match: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
        },
        // 平台
        platform: {
            type: String,
            trim: true,
        },
        // 其他
        collection: {
            type: Object,
        },
    },
});

export default mongoose.model('User', Schema);

export const select = 'email nickname sex avatar autograph followers following create';
