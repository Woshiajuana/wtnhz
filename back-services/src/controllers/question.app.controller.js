
class Controller {
    async hello (ctx, next) {
        console.log(2)
        ctx.pipeDone()
    }
}

export const routes = {
    
};

export default new Controller();
