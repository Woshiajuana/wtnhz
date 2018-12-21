
import Dialogs                  from 'plugins/dialogs.plugin'

export default {

    verifyMultiple (data) {
        let result = false;
        try {
            this.forEach(data, (prop, key) => {
                this._verify(prop, data)
            })
        } catch (error) {
            result = true;
            Dialogs.toast({message: error});
        }
        return result;
    },

    verifySingle (data) {
        let result = false;
        try {
            this._verify(data, data)
        } catch (error) {
            result = true;
            Dialogs.toast({message: error});
        }
        return result;
    },

    _verify (prop, data) {
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
        for(let key in obj){
            callback && callback(obj[key], key);
        }
    },
}
