
import CommentModel, { select, populate }    from '../models/comment.model'

export default {

    // 创建
    async create (options) {
        await new CommentModel(options).save();
    },

    // 删除
    async remove (options) {
        const data = await CommentModel
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
        const data = await CommentModel[key](options)
            .select(select)
            .populate(populate)
            .lean();
        return data;
    },

    // 列表
    async list (options) {
        let {
            pageSize,
            pageIndex,
        } = options;
        const total = await CommentModel.count();
        const list = await CommentModel
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
    },

    // 评论回复
    async update (options) {
        let query = {};
        options._id && (query._id = options._id);
        return await CommentModel.update(query, options, { runValidators: true });
    },
}
