
import Api          from 'api/app.api'
import store        from 'plugins/store.plugin'
import _            from 'utils/lodash.util'

export default {
    getTipInfo: () => new Promise((resolve, reject) => {
        store.get('APPTIPINFO4').then((result) => {
            console.log('store', result);
            resolve(result);
        }).catch((err) => {
            return Api.getTipInfo();
        }).then((result) => {
            console.log('Api', result);
            if (!result) return;
            store.set('APPTIPINFO4', result);
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    })
}

