
import './Promise'
import Defer        from 'utils/defer.util'

const modal = weex.requireModule('modal');
const defer = new Defer(2000);

export default {
    toast: options => {
        if (!defer.do(options.message)) return null;
        let message = options.message || options;
        let duration = options.duration || 2;
        modal.toast({
            message,
            duration,
        });
    },

    alert: (options, callback) => {
        modal.alert(options, callback);
    },

    confirm: (options, callback) => {
        modal.confirm(options, callback);
    },

    prompt: (options, callback) => {
        modal.prompt(options, callback);
    },
};
