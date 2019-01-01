
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
        const user = await UserModel.update({
            _id: options._id
        }, options, { runValidators: true });
        return user;
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
        const user = await UserModel
            .findOne(options)
            .select('email nickname avatar create')
            .lean();
        return user;
    },

    // 生成token
    async token (_id, secret = 'user', expires = 10) {
        if (typeof _id !== 'string')
            _id = _id.toString();
        const token = jwt.sign({ data:_id }, secret, { expiresIn: expires });
        await RedisUtil.setItem(token, _id, expires);
        return token;
    },
}
