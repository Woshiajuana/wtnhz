

const path = require('path');
const fs = require('fs');
const config = require('config');

// 遍历目录结构
let walkFun;
(walkFun = (dir) => {
    dir = dir || '.';
    let directory = path.join(__dirname, '../src/views', dir);
    fs.readdirSync(directory).forEach((file) => {
        let full_path = path.join(directory, file);
        let dir_arr = full_path.substring(full_path.indexOf('views') + 6).replace(/\\/g, '/').split('\/');
        let last_dir = dir_arr[dir_arr.length - 1];
        let stat = fs.statSync(full_path);
        let ext_name = path.extname(full_path);
        if (stat.isFile() && ext_name === '.js' && last_dir === 'entry.js') {
            let page_name = '';
            console.log(dir_arr);
            dir_arr.forEach((item, index) => {
                page_name = index === (dir_arr.length - 1) ? page_name : (page_name ? page_name + '/' + item : item);
            });
            entry[page_name] = full_path;
        } else if (['js','css','img','scss', 'images', 'image'].indexOf(last_dir) === -1 && stat.isDirectory()) {
            let sub_dir = path.join(dir, file);
            walkFun(sub_dir);
        }
    })
})();

const entry = {};
const config = {

};

module.exports = config;
