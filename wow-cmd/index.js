
import path from 'path'
import walk from './utils/walk.util'
import cool from './utils/cool.util'

const parameters = process.argv.splice(2);

export default () => {
    const libPath = path.join(__dirname, '/lib');
    const result = walk.run(libPath, {
        include: ['cmd.js'],
        exclude: [],
    });
    console.log(parameters);
    result.forEach((fireFun = '') => {
        if (fireFun.default)
            fireFun = fireFun.default;
        if (typeof fireFun !== 'function'|| !fireFun.cmd)
            return null;
        let index = cool.findFirstIndexForArr(parameters, (item) => {
            let type = false;
            let cmd = fireFun.cmd;
            cmd.forEach((c) => {
                if (item === c)
                    type = true;
            });
            return type;
        });
        if (index === -1) return null;
        let params = parameters[index + 1];
        fireFun(params);
    });
    return null;
};
