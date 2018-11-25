
const fs = require('fs');
const path = require('path');

let result = {};
module.exports = {
    run (dirPath) {
        fs.readdirSync(dirPath).forEach((file) => {
            let filePath = path.join(dirPath, '/' + file);
            let fileStat = fs.statSync(filePath);
            if (fileStat.isFile() && file === 'entry.js') {
                let fileDirArr = filePath.replace(/\\/g, '/').split('\/');
                let key = fileDirArr[fileDirArr.length - 2];
                result[key] = filePath;
            } else if (fileStat.isDirectory()) {
                this.run(filePath);
            }
        });
        return result;
    }
};
