
const fs = require('fs');
const path = require('path');

module.exports = {
    run (dirPath) {
        let result = {};
        fs.readdirSync(dirPath).forEach((file) => {
            let filePath = path.join(dirPath, '/' + file);
            let fileStat = fs.statSync(filePath);
            if (fileStat.isFile() && file === 'entry.js') {

            } else if (fileStat.isDirectory()) {
                this.run(filePath);
            }
        });
        return result;
    }
};
