export default {
    // 服务监听端口号
    PORT: '10010',

    // mongodb数据库配置
    MONGO_DB: {
        host: 'localhost',
        port: '27017',
        db: 'wtnhz',
        options: {
            username: '',
            password: '',
        },
    },

    // redis数据库配置
    REDIS: {
        host: 'localhost',
        port: '6379',
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
}
