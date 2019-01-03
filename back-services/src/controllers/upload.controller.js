
import config               from '../config/env.config'
import ftpUtil              from '../utils/ftp.util'

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
            let {
                file,
            } = await ctx.check$.testFiles((regular) => {
                return {
                    file: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: (value) => {
                                return regular.isImage(value.type);
                            },
                            prompt: ''
                        }
                    ],
                }
            });
            let {
                _id
            } = await ctx.check$.testBody((regular) => {
                return {
                    _id: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    
                }
            });
            let {
                type,
                path,
            } = file;
            console.log('type', type);
            console.log('path', path);
            // ftpUtil.put(path, `test/test.png`);
            ctx.handle$.success();
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 已文件流的方式上传文件到ftp服务器
    async file (ctx, next) {
        try {
            let {
                file
            } = await ctx.check$.testFiles(() => {
                return {
                    file: [
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
