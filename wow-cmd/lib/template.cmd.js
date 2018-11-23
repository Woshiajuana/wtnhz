
const Template = (params) => new Promise((resolve, reject) => {
    console.log('执行示例代码, 参数', params);
    resolve();
});

Template.cmd = ['-t', '--template'];

export default Template;

