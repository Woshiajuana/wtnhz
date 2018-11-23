
const Handle = (options, data) => new Promise((resolve, reject) => {
    console.log('执行测试代码, 配置参数', options);
    console.log('执行测试代码, 上一个任务传递的数据参数', data);
    resolve();
});

// 参数 options
Handle.options = {
    cmd: ['-t', '-d', '-c'],
};

// 成功
Handle.success = (res, next) => {
    console.log('text 执行成功');
    next(res);
};

// 失败
Handle.error = (err, next) => {
    console.log('text 执行失败');
    next(err);
};

export default Handle;

