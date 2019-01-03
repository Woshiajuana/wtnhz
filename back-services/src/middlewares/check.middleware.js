import _                        from 'lodash'
import regularUtil              from '../utils/regular.util'

export default () => async (ctx, next) => {
    try {
        let {
            body,
            files,
            query,
        } = ctx.request;
        ctx.check$ = {
            regular: {
                ...regularUtil,
            },
            _errResult: '',
            filterParams: {},
            testBody: (options) =>  {
                if (typeof options === 'function') {
                    options = options(ctx.check$.regular)
                }
                return check(ctx.check$, body, options);
            },
            testFiles: (options) => {
                if (typeof options === 'function') {
                    options = options(ctx.check$.regular)
                }
                console.log('files', files);
                return check(ctx.check$, files, options);
            },
            testQuery: (options) => {
                if (typeof options === 'function') {
                    options = options(ctx.check$.regular)
                }
                return check(ctx.check$, query, options);
            },
        };
        await next();
    } catch (err) {
        ctx.app.emit('error', err, ctx);
    }
}

const check = (obj, source, expect) => new Promise((resolve, reject) =>  {
    obj.filterParams = {};
    try {
        _.forEach(expect, (uses, key) => {
            let value = source[key];
            let type = typeof value === 'undefined' || value === null;
            if (!uses || !uses.length)
                return !type && (obj.filterParams[key] = value);
            uses.forEach((use) => {
                let {
                    nonempty,
                    prompt,
                    rule,
                    callback,
                } = use;
                if (nonempty && (type || value === '')) {
                    callback && callback(source);
                    throw {
                        prompt: prompt || '缺少必要参数',
                        key,
                    };
                }
                if (!type && typeof rule === 'function' && !rule(value, source)) {
                    callback && callback(source);
                    throw {
                        prompt: prompt || '参数格式错误',
                        key,
                    };
                }
                if (!type && typeof rule === 'object' && !rule.text(value)) {
                    callback && callback(source);
                    throw {
                        prompt: prompt || '参数格式错误',
                        key,
                    };
                }
            });
            !type && (obj.filterParams[key] = value);
        });
        resolve(obj.filterParams);
    } catch (e) {
        console.log(e)
        let {
            prompt,
            key,
        } = e;
        obj._errResult = prompt && key
            ? `${prompt}:${key}`
            : typeof e === 'object'
                ? JSON.stringify(e)
                : e;
        reject(obj._errResult)
    }
});
