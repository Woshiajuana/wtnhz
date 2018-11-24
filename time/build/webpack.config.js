

const path = require('path');
const fs = require('fs');
const config = require('./config');
const walk = require('./walk.util');

let {
    viewDir,
} = config;
// 遍历目录结构
const entry = walk.run(viewDir);
console.log(entry);
return;
module.exports = {

};
