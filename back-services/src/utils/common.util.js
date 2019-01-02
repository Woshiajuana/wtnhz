

export default {
    randomNum (len) {
        let result = '';
        while (len > 0) {
            len--;
            result += Math.floor(Math.random() * 10)
        }
        return result;
    }
}
