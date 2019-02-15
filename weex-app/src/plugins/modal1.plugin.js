import './Promise'
import path             from 'plugins/path.plugin';
import Defer            from 'utils/defer.util';
import store            from 'plugins/store.plugin'
import dialogs          from 'plugins/dialogs.plugin'

const transition = weex.requireModule('transitionModule');
const defer = new Defer(1000);

export default {
    show: pagename => new Promise((resolve, reject) => {
        if (!defer.do(pagename)) return null; // 过滤连续点击
        if (pagename !== 'wow_user_login1') {
            return getPage(pagename, resolve);
        }
        console.log(1);
        store.get('MODAL_TYPE').then((result) => {
            console.log(2);
            if(result) return resolve();
            console.log(3);
            store.set('MODAL_TYPE', true).then(() => {
                console.log(4);
                getPage(pagename, resolve);
            });
        }).catch(() => {
            console.log(5);
            store.set('MODAL_TYPE', true).then(() => {
                console.log(6);
                getPage(pagename, resolve);
            });
        });
    }).handle(),
    close: () => new Promise((resolve, reject) => {
        store.set('MODAL_TYPE', false);
        transition.dismiss({}, e => {
            resolve();
        });
    }).handle(),
};


function getPage(pagename, resolve) {
    path.page(pagename).then(nativepath => {
        transition.present({ url: nativepath, animated : 'true' }, e => {
            resolve();
        });
    }).catch((error) => {
        store.set('MODAL_TYPE', false);
        dialogs.toast({ message: error });
    });
}
