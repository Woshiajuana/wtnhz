
import {
    Alert,
} from 'react-native'

export default {

    multiple (data, mode) {
        let result = false;
        try {
            this.forEach(data, (prop, key) => {
                this._verify(prop, data, mode)
            })
        } catch (error) {
            result = true;
            !mode && Alert.alert(error);
        }
        return result;
    },

    single (data, mode) {
        let result = false;
        try {
            this._verify(data, data, mode)
        } catch (error) {
            result = true;
            !mode && Alert.alert(error);
    }
        return result;
    },

    _verify (prop, data, mode) {
        let {
            use,
            value,
        } = prop;
        if (!use)
            return null;
        use.forEach((item) => {
            let {
                nonempty,
                rule,
                prompt,
                callback,
            } = item;
            if (nonempty && (typeof value === 'undefined' || value === '')) {
                callback && callback(prop, data);
                throw prompt;
            }
            if (mode === 'nonempty') return null;
            if (typeof rule === 'function' && !rule(value, data)) {
                callback && callback(prop, data);
                throw prompt;
            }
            if (typeof rule === 'object' && !rule.text(value)) {
                callback && callback(prop, data);
                throw prompt;
            }
        });
    },

    forEach (obj, callback) {
        if (Object.prototype.toString.call(obj) === '[object Array]') {
            obj.forEach(callback)
        } else {
            for(let key in obj){
                callback && callback(obj[key], key);
            }
        }

    },
}
