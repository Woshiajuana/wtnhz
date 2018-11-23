
const Delete = (params) => new Promise((resolve, reject) => {
    console.log('执行删除代码, 参数', params);
    resolve();
});

Delete.cmd = ['-d', '--delete'];

export default Delete;

