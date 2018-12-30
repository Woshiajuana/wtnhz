
import _                    from 'lodash'
import logger               from './../utils/logger.util'
import { loggerType }       from './../config/logger.config'

export default () => async (ctx, next) => {
    try {
        let handle$ = {
            _successData: {},
            _errorData: {},
            success: (data = {}, msg = 'success') => {
                handle$._successData = {
                    code: '0000',
                    msg,
                    data,
                }
            },
            error: (input = 'error', code = '9999') => {
                const msg = _.get(input, 'message') || input;
                const stack = _.get(input, 'stack') || undefined;
                const errorType = _.includes(loggerType, _.get(input, 'type'))
                    ? input.type
                    : 'system';
                logger[errorType]().error(__dirname, '失败原因: ', stack || message);
                handle$._errorData = {
                    msg,
                    code,
                };
            },
        };
        ctx.handle$ = handle$;
        await next();
        // 拦截返回
        if (!_.isEmpty(handle$._errorData)) {
            ctx.body = ctx._errorData;
            return null
        }
        if (!_.isEmpty(ctx._successData)) {
            ctx.body = ctx._successData;
            return null
        }
    } catch (err) {
        ctx.app.emit('error', err, ctx);
    }
}
