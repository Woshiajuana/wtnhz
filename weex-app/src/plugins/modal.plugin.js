import './Promise'
import path             from 'plugins/path.plugin';
import Defer            from 'utils/defer.util';
import store            from 'plugins/store.plugin'

const transition = weex.requireModule('transitionModule');
const defer = new Defer(1000);

export default {
    show: pagename => new Promise((resolve, reject) => {
        if (!defer.do(pagename)) return null; // 过滤连续点击
        return getPage(pagename, resolve);
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
    })
}
