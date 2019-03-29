
import FollowingModel, { select, populate }  from '../models/following.model'

export default {

    // 粉丝
    async create (options) {
        await new FollowingModel(options).save();
    },

    // 删除
    async remove (options) {
        const data = await FollowingModel
            .find(options);
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
        const total = await FollowingModel.count();
        const list = await FollowingModel
            .find({ following: _id })
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
