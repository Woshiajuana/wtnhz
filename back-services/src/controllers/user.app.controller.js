
class Controller {
    async login (ctx, next) {
        console.log('login')
        next();
    }
    async send (ctx, next) {
        ctx.check$.testBody((check) => {
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
        next();
    }
    async register (ctx, next) {
        console.log('register')
        next();
    }
}

export default new Controller();
