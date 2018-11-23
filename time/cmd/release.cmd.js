
import fs from 'fs-extra'
import path from 'path'
import {
    log
} from 'wow-cmd'

const Handle = (options, data) => new Promise((resolve, reject) => {
    let {
        params,
        parameters,
    } = options;
    let env = params ? params.toLocaleLowerCase() : '';
    if (!env)
        return reject('发布失败：未指定发布环境');
    let regular = ['bd', 'cs', 'zsc', 'sc'];
    if (regular.indexOf(env) === -1)
        return reject(`发布失败：环境设置错误，环境为：${env}`,);
    log(`设置发布环境 => ${env}`);
    setRelease(env);
    return resolve();
});

// 参数 options
Handle.options = {
    cmd: ['-r', '--release'],
};

// 成功
Handle.success = (res, next) => {
    log(`发布成功：发布环境 ${res}`);
    next(res);
};

// 失败
Handle.error = (err, next) => {
    log(err, '004');
    next();
};

export default Handle;

function setRelease(env, reject) {
    try {
        let content_env = fs.readFileSync(path.join(__dirname, `./../src/config/env.${env}.config.js`));
        log(`${env}环境内容如下：\n${content_env}`);
        content_env = `import env from './env.${env}.config';\nexport default env;`;
        fs.writeFileSync(path.join(__dirname, './../src/config/env.config.js'), content_env);
    } catch (e) {
        return reject(`发布错误：${e}`, '004');
    }
}
