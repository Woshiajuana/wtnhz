
import _ from 'lodash'

import config from '../config/env.config'

export default {
    get () {
        let result = config.PORT;
        let argv = process.argv;
        let index = _.findIndex(argv, (arg) => {
            return arg === '--port' || arg === '-p';
        });
        if (index !== -1 && parseInt(argv[index + 1], 10)) {
            result = argv[index + 1];
        }
        result = parseInt(result, 10);
        if (isNaN(result) || result < 0) {
            throw `端口号设置错误`;
        }
        return result;
    }
}

