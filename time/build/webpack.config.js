

const path = require('path');
const fs = require('fs');
const config = require('./config');

let {
    viewDir,
} = config;

// 遍历目录结构
let walkFun;
(walkFun = (dir) => {
    dir = dir || '.';
    let directory = path.join(viewDir, dir);
    console.log(directory)
    fs.readdirSync(directory).forEach((file) => {
        
    })
})();

const entry = {};
return;
module.exports = {

};
