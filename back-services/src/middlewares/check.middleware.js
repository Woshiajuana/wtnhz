import _                        from 'lodash'
import RegularUtil              from '../utils/regular.util'

export default () => async (ctx, next) => {
    try {
        let body = ctx.request.body;
        let check$ = {
            regular: {
                ...RegularUtil,
            },
            _errResult: '',
            filterParams: {},
            testBody: (options) =>  {
                if (typeof options === 'function') {
                    options = options(check$.regular)
                }
                return check(check$, body, options);
            },
        };
        ctx.check$ = check$;
        await next();
    } catch (err) {
        ctx.app.emit('error', err, ctx);
    }
}

const check = (obj, source, expect) => new Promise((resolve, reject) =>  {
    try {
        _.forEach(expect, (uses, key) => {
            if (!uses || !uses.length)
                return null;
            uses.forEach((use) => {
                let {
                    nonempty,
                    prompt,
                    rule,
                    callback,
                } = use;
                let value = source[key];
                if (nonempty && (typeof value === 'undefined' || value === '')) {
                    callback && callback(source);
                    throw {
                        prompt: prompt || '缺少必要参数',
                        key,
                    };
                }
                if (typeof rule === 'function' && !rule(value, source)) {
                    callback && callback(source);
                    throw {
                        prompt: prompt || '参数格式错误',
                        key,
                    };
                }
                if (typeof rule === 'object' && !rule.text(value)) {
                    callback && callback(source);
                    throw {
                        prompt: prompt || '参数格式错误',
                        key,
                    };
                }
                obj.filterParams[key] = value;
            })
        });
        resolve(obj.filterParams);
    } catch (e) {
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