
import fs from 'fs-extra'
import log from '../utils/log.util'

const Handle = (options, data) => new Promise((resolve, reject) => {
    let {
        params,
        parameters,
    } = options;
    console.log(__dirname);
    console.log('执行删除代码, 配置参数', options);
    console.log('执行删除代码, 上一个任务传递的数据参数', data);
    resolve('传递的参数：哈哈哈');
});

// 参数 options
Handle.options = {
    cmd: ['-d', '--delete'],
};

// 成功
Handle.success = (res, next) => {
    console.log('delete 执行成功');
    next(res);
};

// 失败
Handle.error = (err, next) => {
    console.log('delete 执行失败');
    next(err);
};

export default Handle;

