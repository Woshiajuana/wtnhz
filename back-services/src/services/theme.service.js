
import ThemeModel, {select} from '../models/theme.model'

export default {

    // 创建
    async create (options) {
        await new ThemeModel(options).save();
    },

    // 更新
    async update (options) {
        let query = {};
        options._id && (query._id = options._id);
        options.email && (query.email = options.email);
        return await ThemeModel.update(query, options, { runValidators: true });
    },

    // 删除
    async remove (options) {
        const user = await UserModel
            .findById(options._id);
        if (!user)
            throw Error('无此用户');
        await user.remove();
    },

    // 查询单个
    async one (options) {
        let key = typeof options === 'object'
            ? 'findOne'
            : 'findById';
        const user = await UserModel[key](options)
            .select(select)
            .lean();
        return user;
    },
}
