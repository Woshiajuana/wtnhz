
class Controller {
    async login (ctx, next) {
        console.log('login')
        next();
    }
    async send (ctx, next) {
        console.log('send')
        next();
    }
    async register (ctx, next) {
        console.log('register')
        next();
    }
}

export default new Controller();
