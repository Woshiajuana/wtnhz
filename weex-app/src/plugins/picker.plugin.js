const picker = weex.requireModule('picker');
const supPicker = weex.requireModule('jsonPickModule');
import './Promise'
export default {
    pick: options => new Promise((resolve, reject) => {
        picker.pick(options, e => {
            e.result === 'success' ? resolve(e.data) : null;
        });
    }).handle(),

    pickDate: options => new Promise((resolve, reject) => {
        picker.pickDate(options, e => {
            e.result === 'success' ? resolve(e.data) : null;
        });
    }).handle(),

    picks: options => new Promise((resolve, reject) => {
        supPicker.show(options, e => {
            e.code === '0000' ? resolve(e.data) : reject(e);
        });
    }).handle(),

    // yyyy-MM-dd HH:mm
    showDatePicker: options => new Promise((resolve, reject) => {
        supPicker.showDatePicker(options, e => {
            e.code === '0000' ? resolve(e.data) : reject(e);
        });
    }).handle(),

    showCustomData: options => new Promise((resolve, reject) => {
        supPicker.showCustomData(options, e => {
            e.code === '0000' ? resolve(e.data) : reject(e);
        });
    }).handle(),
};
