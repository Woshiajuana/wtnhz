
import FollowingModel, { select, populate }  from '../models/following.model'
import mongoose                              from 'mongoose'

export default {

    // 粉丝
    async info (options) {
        let data = await FollowingModel.find(options);
        return data[0];
    },

    // 粉丝
    async create (options) {
        const data = await FollowingModel.find(options);
        if (data.length) throw '已关注';
        await new FollowingModel(options).save();
    },

    // 删除
    async remove (following, follower) {
        const data = await FollowingModel.find({
            follower: mongoose.Types.ObjectId(follower),
            following: mongoose.Types.ObjectId(following),
        });
        if (!data[0])
            throw Error('无此数据');
        await data[0].remove();
    },

    // 列表
    async list (options) {
        let {
            pageSize,
            pageIndex,
            _id,
        } = options;
        const total = await FollowingModel.count();
        const list = await FollowingModel
            .find({ follower: mongoose.Types.ObjectId(_id) })
            .sort('-datetime')
            .skip((+pageIndex - 1) * +pageSize)
            .limit(+pageSize)
            .select(select)
            .populate(populate)
            .lean();
        return {
            list,
            total,
            pageSize,
            pageIndex,
        }
    },

}
