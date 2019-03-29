
import FollowerModel, { select, populate }   from '../models/follower.model'

export default {

    // 粉丝
    async create (options) {
        const data = await FollowerModel.find(options);
        if (data) throw '已关注';
        await new FollowerModel(options).save();
    },

    // 删除
    async remove (options) {
        const data = await FollowerModel.find(options);
        if (!data)
            throw Error('无此数据');
        await data.remove();
    },

    // 列表
    async list (options) {
        let {
            pageSize,
            pageIndex,
            _id,
        } = options;
        const total = await FollowerModel.count();
        const list = await FollowerModel
            .find({ follower: _id })
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
