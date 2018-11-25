

const path = require('path');
const fs = require('fs');
const config = require('./config');
const walk = require('./walk.util');

let {
    entryDirName,
    output,
    resolve,
} = config;
// 遍历目录结构
const entry = walk.run(entryDirName);
console.log(entry);

module.exports = {
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
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                exclude: /node_modules/,
                options: {
                    publicPath: webpackConfig.publicPath,
                    name: 'media/[name].[ext]'
                }
            },
            // 处理字体文件
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                exclude: /node_modules/,
                options: {
                    publicPath: webpackConfig.publicPath,
                    name: 'static/font/[name].[ext]'
                }
            },
            {
                test: /\.js(\?[^?]+)?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpeg|jpg|gif|svg)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: '1024',
                        // outputPath: 'static/',
                        publicPath: webpackConfig.publicPath,
                        name: 'static/images/[name].[ext]'
                    }
                }],
            },
            //处理css文件
            {
                test: /\.css$/,
                // exclude: /node_modules/,
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
        new ExtractTextPlugin('static/css/[name].css'),
    ],
};
