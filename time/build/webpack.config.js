

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

const urlLoader = {
    limit: '1024',
    outputPath: 'assets/',
    publicPath: '../',
    name: 'images/[name].[ext]'
};

let webpackConfig = {
    entry,
    output,
    resolve,
    module: {
        rules: [
            // 处理 html 文件
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/,
            },
            // 处理 css 文件
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
            },
            // 处理 scss 文件
            {
                test: /.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    //   在开发环境使用 style-loader
                    fallback: "style-loader"
                })
            },
            // 处理 js 文件
            {
                test: /\.js(\?[^?]+)?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            // 处理url文件
            {
                test: /\.(png|jpeg|jpg|gif|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        // loader: './build/test.loader.js',
                        // loader: './build/assist.url.loader.js',
                        loader: 'url-loader',
                        options: urlLoader,
                    },
                    {
                        loader: './build/assist.url.loader.js',
                        options: {
                            urlLoader,
                            html: {
                                publicPath: '',
                            },
                            css: {
                                publicPath: '../',
                            },
                        }
                    },
                ],
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
