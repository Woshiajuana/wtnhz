
import jwt                  from 'jsonwebtoken'
import svgCaptcha           from 'svg-captcha'
import userModel            from '../models/user.model'
import redisUtil            from '../utils/redis.util'

export default {

    // 创建
    async create (options) {
        await new userModel(options).save();
    },

    // 更新
    async update (options) {
        let query = {};
        options._id && (query._id = options._id);
        options.email && (query.email = options.email);
        return await userModel.update(query, options, { runValidators: true });
    },

    // 删除
    async remove (options) {
        const user = await userModel
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
        const user = await userModel[key](options)
            .select('email nickname avatar create')
            .lean();
        return user;
    },

    // 生成token
    async token (_id, secret = 'user', expires = 10 * 60 * 100) {
        if (typeof _id !== 'string')
            _id = _id.toString();
        const token = jwt.sign({ _id }, secret, { expiresIn: expires });
        await redisUtil.setItem(token, _id, expires);
        return token;
    },

    // 生成图形验证码
    async captcha (email) {
        let times = await redisUtil.getItem(`${email} captcha times`, text);
        
        const {
            text
        } = svgCaptcha.create( {
            size: 5, // 验证码长度
            ignoreChars: '0o1i', // 验证码字符中排除 0o1i
            noise: 2, // 干扰线条的数量
            height: 44
        });
        await redisUtil.setItem(`${email} captcha`, text);
        return text;
    },

    // 生成登录验证码
    async firewall (email, captcha) {
        const text = await redisUtil.getItem(`${email} captcha`);
        if (!text) return true;
        if (text && !captcha)
            throw {
                code: '1001',
                msg: '错误次数过多，请输入图形验证码',
            };
        console.log(captcha.text);
        await redisUtil.setItem(email, captcha.text);

    },
}
