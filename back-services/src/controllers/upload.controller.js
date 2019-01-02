
import config               from '../config/env.config'

const {
    ASSETS_PATH,
} = config;

class Controller {

    // 以base64格式上传图片
    async base64 (ctx, next) {
        try {
            let filterParams = await ctx.check$.testBody(() => {
                return {
                    base64: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        }
                    ],
                    suffix: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        }
                    ],
                }
            });
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 以文件流上传图片
    async image (ctx, next) {
        try {
            let filterParams = await ctx.check$.testBody(() => {
                return {
                    base64: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        }
                    ],
                    suffix: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        }
                    ],
                }
            });
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

}

export default new Controller();
