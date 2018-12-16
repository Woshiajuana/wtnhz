
import path                     from 'path'
import requireAll               from 'require-all'

const controllers = requireAll({
    dirname: path.join(__dirname, '../controllers/'),
    filter: /(.+)\.controller\.js$/,
});

const routers = requireAll({
    dirname: path.join(__dirname, './'),
    filter: /(.+)\.route\.js$/,
});

console.log(controllers);
console.log(routers);

// import UserAppRoute             from './user.app.route'
//
// export default {
//     ...UserAppRoute,
// }
