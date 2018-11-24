
const fs = require('fs');
const path = require('path');

let result = {};
module.exports = {
    run (dirPath) {
        console.log('进来了')
        fs.readdirSync(dirPath).forEach((file) => {
            let filePath = path.join(dirPath, '/' + file);
            let fileStat = fs.statSync(filePath);
            if (fileStat.isFile() && file === 'entry.js') {
                let fileDirArr = filePath.replace(/\\/g, '/').split('\/');
                let key = fileDirArr[fileDirArr.length - 1];
                result[key] = filePath;
                console.log('算值',result)
            } else if (fileStat.isDirectory()) {
                this.run(filePath);
            }
        });
        console.log('1',result)
        console.log('结束了')
        return result;
    }
};
