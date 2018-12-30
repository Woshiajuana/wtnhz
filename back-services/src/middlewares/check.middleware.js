import _                        from 'lodash'
import RegularUtil              from '../utils/regular.util'

export default () => async (ctx, next) => {
    let body = ctx.request.body;
    let check$ = {
        ...RegularUtil,
        result: '',
        testBody: (options) => {
            if (typeof options === 'function') {
                options = options(check$)
            }
            check(check$, body, options);
            return check$.result;
        },
    };
    ctx.check$ = check$;
    next();
}

const check = (obj, source, expect) => {
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
                    throw { prompt, key };
                }
                if (typeof rule === 'function' && !rule(value, source)) {
                    callback && callback(source);
                    throw { prompt, key };
                }
                if (typeof rule === 'object' && !rule.text(value)) {
                    callback && callback(source);
                    throw { prompt, key };
                }
            })
        })
    } catch (e) {
        let {
            prompt,
            key,
        } = e;
        obj.result = prompt && key
            ? `${prompt}:${key}`
            : typeof e === 'object'
                ? JSON.stringify(e)
                : e;
    }
};
