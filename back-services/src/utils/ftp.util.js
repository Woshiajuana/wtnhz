
import _                from 'lodash'
import Ftp              from 'ftp'
import config           from './../config/env.config'

const {
    FTP
} = config;

// 如果不存在目录，则创建
const tryDir = (ftp, path) => new Promise((resolve, reject) => {
    path = path.substr(0, path.lastIndexOf('/'));
    ftp.list(path, (err, list) => {
        if (err)
            return reject(err);
        if (!_.isEmpty(list))
            return resolve();
        ftp.mkdir(path, true, (err) => {
            err ? reject(err) : resolve();
        })
    })
});

// 存储文件
const put = (input, output) => new Promise((resolve, reject) => {
    const ftp = new Ftp();
    ftp.on('ready', async () => {
        await tryDir(ftp, output);
        ftp.put(input, output, (err) => {
            ftp.end();
            err ? reject(err) : resolve();
        })
    });
    ftp.connect(FTP)
});

// 存储多个文件
const puts = (list) => new Promise((resolve, reject) => {
    const ftp = new Ftp();
    ftp.on('ready', async () => {
        let loop;
        await (loop = async (arr) => {
            if (_.isEmpty(arr))
                return resolve();
            const item = arr.shift();
            await tryDir(ftp, item.output);
            ftp.put(item.input, item.output, async(err) => {
                if (err)
                    return reject(err);
                await loop(arr);
            })
        })([...list]);
    });
    ftp.connect(FTP);
});

// 上传Base64到ftp服务器
const base64 = () => new Promise((resolve, reject) => {

});

export default {
    put,
    puts,
}
