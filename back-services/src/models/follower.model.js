
// 粉丝表

import mongoose                 from 'mongoose'

const Schema = new mongoose.Schema({

    // 被关注的人
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //这里要写你指向的数据库表名字
    },

    

});

export default mongoose.model('Follower', Schema);
