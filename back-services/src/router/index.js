
import _                        from 'lodash'
import path                     from 'path'
import requireAll               from 'require-all'
import Router                   from 'koa-router'

import routes                   from './routes'

const router = new Router();

const controllers = requireAll({
    dirname: path.join(__dirname, '../controllers/'),
    filter: /(.+)\.controller\.js$/,
});

let loop = null;
(loop = (routes, routePath = '') => {
    routes.forEach((route, index) => {
        let {
            path,
            children,
            requests,
        } = route;
        routePath = routePath + path;
        _.forEach(requests, (ctrs, key) => {
            if (key === 'del')
                key = 'delete';
            let funs = [];
            ctrs.forEach((ctr) => {
                let {
                    controller,
                    method,
                } = ctr;
                console.log(method)
                let fun = controllers[controller];
                console.log(fun.default.hello)
                console.log(fun.default[method])
                fun = fun.default
                    ? fun.default[method]
                    : fun[method];
                console.log(fun)
                funs.push(fun);
            });
            router[key](routePath, ...funs)
        });
        if (children && children.length > 0)
            loop(children, routePath);
    })
})(routes);





export default router;
