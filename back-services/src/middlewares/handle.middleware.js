
import _                    from 'lodash'
import logger               from './../utils/logger.util'
import { loggerType }       from './../config/logger.config'

export default () => async (ctx, next) => {
    try {
        ctx._pipeDoneData = {};
        ctx._pipeFailData = {};
        ctx.pipeDone = (result) => {
            ctx._pipeDoneData = { code: '0000', result };
        };
        ctx.pipeFail = (input, code = '9999') => {
            const message = _.get(input, 'message') || input;
            const stack = _.get(input, 'stack') || undefined;
            ctx._pipeFailData = { code, message };
            const errorType = _.includes(loggerType, _.get(input, 'type')) ? input.type : 'system';
            logger[errorType]().error(__dirname, '失败原因: ', stack || message)
        };
        console.log(0)
        await next();
        console.log(1)

        return  ctx.body = {}
        // 拦截返回
        if (!_.isEmpty(ctx._pipeFailData)) {
            console.log(2)
            console.log(ctx._pipeFailData)
            ctx.body = ctx._pipeFailData;
            return null
        }
        if (!_.isEmpty(ctx._pipeDoneData)) {
            ctx.body = ctx._pipeDoneData;
            return null
        }
    } catch (err) {
        ctx.app.emit('error', err, ctx);
    }
}
