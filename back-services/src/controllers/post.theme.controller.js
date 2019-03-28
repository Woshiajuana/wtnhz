
import codeService          from '../services/code.service'
import mailService          from '../services/mail.service'
import userService          from '../services/user.service'

class Controller {

    // 新增
    async add (ctx, next) {
        try {
            let filterParams;
            let {
                email,
                captcha,
            } = filterParams = await ctx.check$.testBody((regular) => {
                return {
                    email: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: regular.isEmail,
                            prompt: '参数格式错误',
                        },
                    ],
                    password: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: (value) => {
                                let len = value.length;
                                return len >= 6 && len <= 32;
                            },
                            prompt: '密码长度为6~32位',
                        },
                    ],
                    captcha: [],
                }
            });
            await userService.firewall(email, captcha);
            delete filterParams.captcha;
            let user = await userService.one(filterParams);
            if (!user) await userService.filterTimes(email, captcha);
            await userService.clearCaptcha(email);
            user.token = await userService.token(user._id);
            ctx.handle$.success(user);
        } catch (err) {
            ctx.handle$.error(err);
        }
    }
}

export default new Controller();
