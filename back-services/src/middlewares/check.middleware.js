import _                        from 'lodash'
import RegularUtil              from '../utils/regular.util'

export default () => async (ctx, next) => {
    let body = ctx.request.body;
    let check$ = {
        ...RegularUtil,
        result: true,
        testBody: (options) => {
            if (typeof options === 'function') {
                options = options(check$)
            }
            return check(ctx, body, options);
        },
    };
    ctx.check$ = check$;
    next();
}

const check = (ctx, source, expect) => {
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
                throw prompt;
            }
        })
    })
};
