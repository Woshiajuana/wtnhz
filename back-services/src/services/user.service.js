
import jwt                  from 'jsonwebtoken'
// import svgCaptcha           from 'svg-captcha'
import CaptchaPng           from 'captchapng'
import UserModel            from '../models/user.model'
import redisUtil            from '../utils/redis.util'
import commonUtil           from '../utils/common.util'

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
        await redisUtil.setItem(token, _id, expires);
        return token;
    },

    // 生成图形验证码
    async captcha (email) {
        let text = commonUtil.randomNum(6);
        let captchaPng = new CaptchaPng(80, 30, text);
        captchaPng.color(255, 255, 255, 0);  // First color: background (red, green, blue, alpha)
        captchaPng.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
        // let data = new Buffer(captchaPng.getBase64(), 'base64');
        let data = captchaPng.getBase64();
        // let {
        //     text,
        //     data,
        // } = svgCaptcha.create( {
        //     size: 5, // 验证码长度
        //     ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        //     noise: 2, // 干扰线条的数量
        //     height: 44
        // });
        await redisUtil.setItem(`${email} captcha`, text);
        return {
            text,
            data,
        };
    },

    // 判断次数
    async filterTimes (email, captcha) {
        let times = await redisUtil.getItem(`${email} captcha times`) || 0;
        let msg = '账号或密码错误';
        if (times < 3) {
            times++;
            await redisUtil.setItem(`${email} captcha times`, times);
            throw msg;
        }
        let data = await this.captcha(email);
        if (!captcha)
            msg = '错误次数过多，请输入图形验证码';
        throw {
            code: '1001',
            msg,
            data,
        };
    },

    // 验证验证图形码
    async firewall (email, captcha) {
        const text = await redisUtil.getItem(`${email} captcha`);
        if (!text)
            return null;
        if (!captcha)
            await this.filterTimes(email);
        if (text !== captcha)
            throw '图形验证码错误';
    },

    // 清除
    async clearCaptcha (email) {
        await redisUtil.delItem(`${email} captcha`);
        await redisUtil.delItem(`${email} captcha times`);
    }
}
