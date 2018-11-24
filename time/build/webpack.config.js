

const path = require('path');
const fs = require('fs');
const config = require('./config');

// 遍历目录结构
let walkFun;
(walkFun = (dir) => {
    dir = dir || '.';
    let directory = path.join(__dirname, '../src/views', dir);
    fs.readdirSync(directory).forEach((file) => {

    })
})();

const entry = {};
const config = {

};

module.exports = config;
