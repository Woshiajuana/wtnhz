let Path = require('path');
let fs = require('fs');
let _loaderUtils = require('loader-utils');

module.exports = function (content) {
    let options = (0, _loaderUtils.getOptions)(this) || {};
    console.log('test',options);
    return content;
};
