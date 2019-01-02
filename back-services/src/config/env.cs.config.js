
import path                 from 'path'

export default {
    // 服务监听端口号
    PORT: '10010',

    // mongodb数据库配置
    MONGO_DB: {
        host: 'mongo.xiaomiqiu.com',
        port: '80',
        db: 'wtnhz',
        options: {
            username: '',
            password: '',
        },
    },

    // redis数据库配置
    REDIS: {
        host: 'redis.xiaomiqiu.com',
        port: '80',
        db: '0',
        family: 'IPv4',
        pass: 'zbDHVaWOgMdV4rPQ3wETRYfRFjlEos83',
    },

    // mail邮箱配置
    MAIL: {
        // service: 'QQ',
        host: 'smtp.mxhichina.com', // 主机
        secureConnection: true, // 使用 SSL
        port: 465, // SMTP 端口
        auth: {
            user: 'zhigang.chen@owulia.com',
            pass: 'liujiaoyan1120/'
        }
    },

    // 公共资源目录
    ASSETS_PATH: path.join(__dirname, '../../assets/')
}
