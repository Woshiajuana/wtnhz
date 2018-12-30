import _                        from 'lodash'
import RegularUtil              from '../utils/regular.util'

export default () => async (ctx, next) => {
    let body = ctx.request.body;
    let check$ = {
        ...RegularUtil,
        result: [],
        testBody: (options) => {
            if (typeof options === 'function') {
                options = options(check$)
            }
            return check(check$, body, options);
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

            })
        })
    } catch (e) {
        let {
            prompt,
            key,
        } = e;
        obj.result.push(`${prompt}:${key}`)
    }
};
