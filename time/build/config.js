const path = require('path');

module.exports = {

    // 入口文件目录
    entryDirName: path.join(__dirname, '../src/views'),

    // 输出文件目录
    output: {
        filename: 'assets/js/[name].js',
        path: path.join(__dirname, '../dist')
    },

    // 替换路径配置
    resolve: {
        alias: {
            'config': path.resolve(__dirname, '../src/config/'),
        }
    }

};
