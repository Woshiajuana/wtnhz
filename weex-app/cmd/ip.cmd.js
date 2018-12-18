
import fs from 'fs'
import path from 'path'
import {
    log
} from 'wow-cmd'

const Handle = (options, data) => new Promise((resolve, reject) => {
    let {
        params,
        parameters,
    } = options;
    let ip = params || '';
    if (!ip)
        ip = getIp();
    let regular = /^\d+\.\d+\.\d+\.\d+$/;
    if (!regular.test(ip))
        return reject(`IP设置错误，环境为：${ip}`,);
    log(`设置IP地址 => ${ ip }`);
    const content = `export default "${ip}";`;
    fs.writeFileSync(path.join(__dirname, `./../config/ip.config.js`), content);
    log(`设置本地IP地址配置成功`);
    return resolve();
});

// 参数 options
Handle.options = {
    cmd: ['-i', '--ip'],
};

// 成功
Handle.success = (res, next) => {
    next(res);
};

// 失败
Handle.error = (err, next) => {
    log(err, '004');
    next();
};

export default Handle;

function getIp() {
    let interfaces = require('os').networkInterfaces();
    for(let devName in interfaces){
        let iface = interfaces[devName];
        for(let i=0;i<iface.length;i++){
            let alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}
