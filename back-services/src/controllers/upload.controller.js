
import config               from '../config/env.config'
import ftpUtil              from '../utils/ftp.util'
import commonUtil           from '../utils/common.util'

const {
    ASSETS_PATH,
    FTP,
} = config;

function dataURLtoFile(dataurl, filename) { //将base64转换为文件
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

class Controller {

    // 以base64格式上传图片
    async base64 (ctx, next) {
        try {
            let {
                base64,
                suffix,
            } = await ctx.check$.testBody(() => {
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
                    action: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                }
            });
            // let file = dataURLtoFile(base64, suffix);
            // console.log(file);
            // var fs = require('fs');
            // var path = 'public/resources/views/headPortrait/'+ Date.now() +'.png';//从app.js级开始找--在我的项目工程里是这样的
            // var base64 = data.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
            // var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
            // console.log('dataBuffer是否是Buffer对象：'+Buffer.isBuffer(dataBuffer));
            // fs.writeFile(path,dataBuffer,function(err){//用fs写入文件
            //     if(err){
            //         console.log(err);
            //     }else{
            //         console.log('写入成功！');
            //     }
            // })
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
                            prompt: '图片格式不支持'
                        },
                        {
                            rule: ({size}) => {
                                return size < 2 * 1000 * 1000;
                            },
                            prompt: '图片不能超过2M'
                        },
                    ],
                }
            });
            let {
                _id,
                action,
            } = await ctx.check$.testBody((regular) => {
                return {
                    _id: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    action: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ]
                }
            });
            let {
                type,
                path,
            } = file;
            let {
                rename,
            } = commonUtil.parseFile(file);
            let output = `${_id}/${action}/${rename}`;
            await ftpUtil.put(path, output);
            ctx.handle$.success({
                path: `${FTP.baseUrl}${output}`,
            });
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
