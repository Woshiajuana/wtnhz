

const path = require('path');
const fs = require('fs');
const config = require('./config');
const walk = require('./walk.util');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let {
    entryDirName,
    output,
    resolve,
    htmlWebpackPluginOptions,
    extractTextPlugin,
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
            },
            //处理css文件
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
            },
            {
                test: /.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // 在开发环境使用 style-loader
                    fallback: "style-loader"
                })
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin(extractTextPlugin),
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
