
class Controller {
    async hello (ctx, next) {
        console.log('hello')
    }
    async test (ctx, next) {
        console.log('test')
    }
}

export default new Controller();
