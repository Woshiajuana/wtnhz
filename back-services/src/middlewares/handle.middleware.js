
import _                    from 'lodash'
import logger               from './../utils/logger.util'
import { loggerType }       from './../config/logger.config'

export default () => async (ctx, next) => {
    try {
        ctx.handle$ = {
            _successData: {},
            _errorData: {},
            success: (data = {}, msg = 'success') => {
                ctx.handle$._successData = {
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
                logger[errorType]().error(__dirname, '失败原因: ', stack || msg);
                ctx.handle$._errorData = {
                    msg,
                    code,
                };
            },
        };
        await next();
        // 拦截返回
        if (!_.isEmpty(ctx.handle$._errorData)) {
            ctx.body = ctx.handle$._errorData;
            return null
        }
        if (!_.isEmpty(ctx.handle$._successData)) {
            ctx.body = ctx.handle$._successData;
            return null
        }
    } catch (err) {
        ctx.app.emit('error', err, ctx);
    }
}
