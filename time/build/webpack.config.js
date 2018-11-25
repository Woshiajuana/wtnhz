

const path = require('path');
const fs = require('fs');
const config = require('./config');
const walk = require('./walk.util');
const HtmlWebpackPlugin = require('html-webpack-plugin');


let {
    entryDirName,
    output,
    resolve,
    htmlWebpackPluginOptions
} = config;
// 遍历目录结构
const entry = walk.run(entryDirName);
console.log(entry);


let webpackConfig = {
    entry,
    output,
    resolve,
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/,
                options: {
                    // 除了img的src,还可以继续配置处理更多html引入的资源
                    attrs: ['img:src', 'img:data-src', 'audio:src']
                }
            },
        ]
    },
    plugins: [
        // new ExtractTextPlugin('static/css/[name].css'),
    ],
};
for (let key in entry) {
    const htmlPlugin = new HtmlWebpackPlugin({
        filename: `${key}.html`,
        template: entry[key].replace('entry.js', 'index.html'),
        minify: { removeAttributeQuotes: true },
        chunks: [key, 'list'],
        inject: 'body',
    });
    webpackConfig.plugins.push(htmlPlugin);
}


module.exports = webpackConfig;
