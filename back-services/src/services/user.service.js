
import UserModel            from '../models/user.model'

export default {

    // 创建
    async create (options) {
        await new UserModel(options).save();
    },

    // 更新
    async update (options) {
        await UserModel.update({
            _id: options._id
        }, options, { runValidators: true });
    },

    // 删除
    async remove (options) {
        const user = await UserModel.findById(options._id);
        if (!user)
            throw Error('无此用户');
        await user.remove();
    },

    // 查询单个
    async one (options) {
        const user = await UserModel
            .findOne(options).select('email nickname avatar create').lean();
        return user;
    }
}
