
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
        return await ThemeModel.update(query, options, { runValidators: true });
    },

    // 删除
    async remove (options) {
        const theme = await ThemeModel
            .findById(options._id);
        if (!theme)
            throw Error('无此标签');
        await theme.remove();
    },

    // 查询单个
    async one (options) {
        let key = typeof options === 'object'
            ? 'findOne'
            : 'findById';
        const theme = await ThemeModel[key](options)
            .select(select)
            .lean();
        return theme;
    },

    // 列表
    async list (options) {
        let {
            pageSize,
            pageIndex,
        } = options;
        const total = await ThemeModel.count();
        const themes = await ThemeModel
            .find()
            .sort('-datetime')
            .skip((pageIndex - 1) * pageSize)
            .limit(pageSize)
            .select(select)
            .lean();
        return {
            list: themes,
            total,
            pageSize,
            pageIndex,
        }
    }
}
