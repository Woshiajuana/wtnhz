

// 主题表

import mongoose                 from 'mongoose'

const Schema = new mongoose.Schema({

    // 邮箱
    name: {
        type: String,
        unique: true,
        trim: true,
    },

});

export default mongoose.model('Theme', Schema);

export const select = 'name';