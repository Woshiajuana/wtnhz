
import jwt                  from 'jsonwebtoken'
import UserModel            from '../models/user.model'
import RedisUtil            from '../utils/redis.util'

export default {

    // 创建
    async create (options) {
        await new UserModel(options).save();
    },

    // 更新
    async update (options) {
        let query = {};
        options._id && (query._id = options._id);
        options.email && (query.email = options.email);
        return await UserModel.update(query, options, { runValidators: true });
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
            .select('email nickname avatar create')
            .lean();
        return user;
    },

    // 生成token
    async token (_id, secret = 'user', expires = 10 * 60 * 100) {
        if (typeof _id !== 'string')
            _id = _id.toString();
        const token = jwt.sign({ _id }, secret, { expiresIn: expires });
        await RedisUtil.setItem(token, _id, expires);
        return token;
    },
}
