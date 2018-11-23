import fs from 'fs'
import path from 'path'

export default {
    /**
     * @param cmdPath [String] 路径
     * @param options [Object] 参数
     * @return [Array] 数组
     * */
    run (cmdPath, options = {include: [], exclude: []}) {
        let result = [];
        let {
            include,
            exclude,
        } = options;
        try {
            let files = fs.readdirSync(cmdPath);
            files.forEach((file) => {
                let filePath = path.join(cmdPath, '/' + file);
                let fileStat = fs.statSync(filePath);
                if (fileStat.isFile() && indexOf(include, file)) {
                    try {
                        let fireFun = require(filePath);
                        if (typeof fireFun !== 'function')
                            fireFun = fireFun.default;
                        if (typeof fireFun === 'function')
                            result.push(fireFun);
                    } catch (e) {
                        console.error('导入' + filePath +'文件错误',e);
                    }
                } else if (fileStat.isDirectory() && indexOf(exclude, file)) {
                    this.run(filePath);
                }
            })
        } catch (e) {
            console.error('遍历CMD任务出现错误：',e);
        }
        return result;
    }
}


function indexOf (arr = [], text = '') {
    let result = false;
    arr.forEach((item) => {
        if (text.indexOf(item) > -1)
            result = true;
    });
    return result;
}
