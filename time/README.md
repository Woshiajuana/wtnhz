# time.wtnhz.com

> web page、 wap page

## Author

> Ajuan <979703986@qq.com>

## 目录结构

```
project
├── build                                   // 打包脚本目录
|   ├── webpack.config.js                   // 打包脚本
├── cmd                                     // node命令目录
|   ├── app.cmd.js
|   ├── cmd.js
|   ├── index.js
|   ├── ip.cmd.js
|   ├── release.cmd.js
|   ├── tree.cmd.js
├── config                                  // node命令配置文件
|   ├── app.config.js
|   ├── ip.config.js
|   ├── log.config.js
|   ├── meta.config.js
|   ├── release.config.js
|   ├── tree.config.js
├── dist                                    // 打包出来的js目录（用户部署生产）
|   ├── assets                              // 静态文件目录
│   |   └── css                             // 样式资源
│   |   └── js                              // js资源
│   |   └── image                           // 图片资源
|   ├── [xx].html                           // 页面
├── node_modules                            // 依赖
├── src                                     // 项目目录
|   ├── api                                 // 接口目录
│   ├── components                          // 组件目录
│   ├── config                              // 项目配置目录
│   ├── plugins                             // 插件目录
│   ├── utils                               // 工具目录
│   ├── services                            // 服务目录
│   ├── views                               // 页面目录
│   |   └── market
├── tools                                   // node命令工具目录
|   ├── common.tool.js
|   ├── fs.tool.js
|   ├── log.tool.js
|   ├── process.tool.js
├── .babelrc                                // babel 配置文件
├── .editorconfig                           // 代码格式文件
├── .gitignore                              // 忽略文件
├── package.json
├── package-lock.json
├── README.md

```



