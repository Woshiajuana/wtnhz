
import Koa                  from 'koa'
import koaConvert           from 'koa-convert'
import koaBody              from 'koa-body'
import router               from './router'
import loggerUtil           from './utils/logger.util'
import handleMiddle         from './middlewares/handle.middleware'
import checkMiddle          from './middlewares/check.middleware'


const app = new Koa();
app.jsonSpaces = 0; // 压缩json返回中的空格
app.keys = ['key'];

// 请求解析
app.use(koaConvert(koaBody({
    multipart: true,
    formLimit: '5mb',
})));

// 中间件
app.use(koaConvert.compose(
    checkMiddle(), // 验证者
    handleMiddle(), // 处理者
));

// 日志
app.use(loggerUtil.http());
// 日志
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    loggerUtil.app().info(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// 路由
app.use(router.routes());
app.use(router.allowedMethods({
    throw: true,
}));

// 监听错误
app.on('error', (err, ctx) => {
    loggerUtil.app().error('服务错误: ', err, ctx)
});

export default app;
