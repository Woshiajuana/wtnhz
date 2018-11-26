
const fs = require('fs');
const path = require('path');


module.exports = {
    run (dirPath) {
        let result = {};
        let loop;
        (loop = (dir) => {
            fs.readdirSync(dir).forEach((file) => {
                let filePath = path.join(dir, '/' + file);
                let fileStat = fs.statSync(filePath);
                if (fileStat.isFile() && file === 'entry.js') {
                    let fileDirArr = filePath.replace(/\\/g, '/').split('\/');
                    let key = fileDirArr[fileDirArr.length - 2];
                    result[key] = filePath;
                } else if (fileStat.isDirectory()) {
                    loop(filePath);
                }
            });
        })(dirPath);
        return result;
    }
};
