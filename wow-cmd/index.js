
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
    console.log(result);
    if (!parameters.length)
        return;
    let fireFunArr = [];
    parameters.forEach((item, index) => {
        result.forEach((fireFun) => {
            if (fireFun.default)
                fireFun = fireFun.default;
            if (typeof fireFun !== 'function'|| !fireFun.cmd)
                return null;
            let cmd = fireFun.cmd;
            let type = false;
            cmd.forEach((c) => {
                if (item === c)
                    type = true;
            });
            if (!type)
                return null;
            let params = parameters[index + 1];
            fireFunArr.push({fireFun, params});
        })
    });
    (function fireFun(index) {
        fireFunArr[index]
        && fireFunArr[index].fireFun
        && fireFunArr[index].fireFun(fireFunArr[index].params).then(() => {
            return fireFun(++index);
        })
    })(0);
    return null;
};
