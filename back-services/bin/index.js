
import http                     from 'http'
import loggerUtil               from './../src/utils/logger.util'
import portUtil                 from './../src/utils/port.util'
import mongodbUtil              from './../src/utils/mongodb.util'
import app                      from './../src/app'

(async () => {

    // 链接数据库
    try {
        await mongodbUtil.connect();
    } catch (err) {
        loggerUtil.system().error(`启动失败，原因=> ${ JSON.stringify(err) }`);
        process.exit(1);
    }

    // 启动web服务
    try {
        const server = http.createServer(app.callback());
        const port = portUtil.get();
        server.listen(port);
        server.on('error', (err) => {
            if (err.syscall !== 'listen') throw err;
            switch (err.code) {
                case 'EACCES':
                    loggerUtil.system().error(`${port}=> 端口号需要有更高的权限`);
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    loggerUtil.system().error(`${port}=> 端口被占用`);
                    process.exit(1);
                    break;
                default:
                    throw err;
            }
        });
        server.on('listening', () => {
            const address = server.address();
            const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port;
            loggerUtil.system().info('服务启动=> ' + bind);
        });
    } catch (err) {
        loggerUtil.system().error(`启动失败，原因=> ${ JSON.stringify(err) }`)
    }

})();
