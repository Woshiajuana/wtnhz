
import _                from 'lodash'
import Ftp              from 'ftp'
import fs               from 'fs'
import path             from 'path'
import config           from './../config/env.config'

const {
    ASSETS_PATH,
    FTP,
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


const mkDir = (to) => {
    // let paths = to.replace(/\\/g, '/').split(path.sep);
    let paths = to.replace(/\\/g, '/').split('/');
    let filePath = '';
    console.log(to)
    console.log(paths)
    paths.forEach((dir, index) => {
        !dir && (dir = '/');
        filePath = filePath ? path.join(filePath, dir) : dir;
        if (!fs.existsSync(filePath)) {
            console.log('创建', filePath)
            fs.mkdirSync(filePath);
        } else {
            console.log(filePath)
        }
    });
};

// 上传Base64到ftp服务器
const base64 = (base64, output) => new Promise((resolve, reject) => {
    let dataBuffer = new Buffer(base64, 'base64');
    let input = `${ASSETS_PATH}${output}`;
    let to = input.substr(0, input.lastIndexOf('/'));
    mkDir(to);
    fs.writeFile(input, dataBuffer, async (err) => {
        if (err)
            return reject(err);
        await put(input, output);
        resolve();
    })
});

export default {
    put,
    puts,
    base64,
}
