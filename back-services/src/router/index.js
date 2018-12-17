
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
            request,
        } = route;
        routePath = routePath + path;
        _.forEach(request, (ctrs, key) => {
            if (key === 'del')
                key = 'delete';
            let funs = [];
            ctrs.forEach((ctr) => {
                let {
                    controller,
                    method,
                } = ctr;
                let fun = controllers[controller];
                fun = fun.default
                    ? fun.default[method]
                    : fun[method];
                funs.push(fun);
            });
            router[key](routePath, ...funs)
        });
        if (children && children.length > 0)
            loop(children, routePath);
    })
})(routes);

export default router;
