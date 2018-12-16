
import path                     from 'path'
import requireAll               from 'require-all'
import Router                   from 'koa-router'

const router = new Router();

const controllers = requireAll({
    dirname: path.join(__dirname, '../controllers/'),
    filter: /(.+)\.controller\.js$/,
});

const routes = requireAll({
    dirname: path.join(__dirname, './'),
    filter: /(.+)\.route\.js$/,
});

console.log(controllers);
console.log(routes);


export default router;


// import UserAppRoute             from './user.app.route'
//
// export default {
//     ...UserAppRoute,
// }
