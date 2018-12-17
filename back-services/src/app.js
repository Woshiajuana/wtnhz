
import Koa                  from 'koa'
import koaLogger            from 'koa-logger'
import koaSession           from 'koa-session'
import router               from './router'

const app = new Koa();

// 路由
app.use(router.routes());
app.use(router.allowedMethods({
    throw: true,
}));

export default app;
