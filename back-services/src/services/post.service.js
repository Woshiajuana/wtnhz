
import PostModel, { select, populate }    from '../models/post.model'

export default {

    // 创建
    async create (options) {
        await new PostModel(options).save();
    },

    // 更新
    async update (options) {
        let query = {};
        options._id && (query._id = options._id);
        return await PostModel.update(query, options, { runValidators: true });
    },

    // 删除
    async remove (options) {
        const data = await PostModel
            .findById(options._id);
        if (!data)
            throw Error('无此帖子');
        await data.remove();
    },

    // 查询单个
    async one (options) {
        let key = typeof options === 'object'
            ? 'findOne'
            : 'findById';
        const data = await PostModel[key](options)
            .select(select)
            .lean();
        return data;
    },

    // 列表
    async list (options) {
        let {
            pageSize,
            pageIndex,
        } = options;
        const total = await PostModel.count();
        const list = await PostModel
            .find()
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
    }
}
