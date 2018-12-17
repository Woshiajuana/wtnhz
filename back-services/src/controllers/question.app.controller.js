
class Controller {
    async hello (ctx, next) {
        console.log('hello')
        next();
    }
    async test (ctx, next) {
        console.log('test')
        next();
    }
}

export default new Controller();
