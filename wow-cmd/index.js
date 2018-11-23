
import path from 'path'
import walk from './utils/walk.util'
import task from './utils/task.util'

const parameters = process.argv.splice(2);

export default () => {
    const libPath = path.join(__dirname, '/lib');
    const result = walk.run(libPath, {
        include: ['cmd.js'],
        exclude: [],
    });
    if (!parameters.length)
        return;
    let fireFunArr = [];
    parameters.forEach((item, index) => {
        result.forEach((fireFun) => {
            if (fireFun.default)
                fireFun = fireFun.default;
            if (typeof fireFun !== 'function'
                || !fireFun.options
                || !fireFun.options.cmd)
                return null;
            let cmd = fireFun.options.cmd;
            let type = false;
            cmd.forEach((c) => {
                if (item === c)
                    type = true;
            });
            if (!type)
                return null;
            let options = {
                params: parameters[index + 1],
                parameters,
            };
            fireFunArr.push({
                fireFun,
                options,
            });
        })
    });
    if (!fireFunArr.length)
        return null;
    task.run(...fireFunArr);
    return null;
};
