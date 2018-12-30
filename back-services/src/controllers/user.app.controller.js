
class Controller {
    async login (ctx, next) {
        console.log('login')
        next();
    }
    async send (ctx, next) {
        try {
            let result = ctx.check$.testBody((check) => {
                return {
                    email: [
                        {
                            nonempty: true,
                            prompt: '请输入邮箱',
                        },
                        {
                            rule: check.isEmail,
                            prompt: '邮箱输入错误',
                        },
                    ]
                }
            });
            if (result) {
                console.log('哈哈', result)
                ctx.pipeFail(result);
            }
        } catch (e) {

        }
        // next();
    }
    async register (ctx, next) {
        console.log('register')
        next();
    }
}

export default new Controller();
