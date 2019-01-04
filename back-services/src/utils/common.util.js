

export default {
    randomNum (len) {
        let result = '';
        while (len > 0) {
            len--;
            result += Math.floor(Math.random() * 10)
        }
        return result;
    },

    parseFile (file) {
        let {
            type
        } = file;
        let suffix = type.split('/')[1];
        if (suffix === 'javascript') suffix = 'js';
        return {
            suffix,
            rename: this.parseName(suffix),
        }
    },

    parseName (suffix) {
        return `${new Date().getTime()}${Math.floor(Math.random() * 10000000)}.${suffix}`
    },
}
