const QrCode = weex.requireModule('qrCodeModule');
import './Promise'

export default {
    create: (obj) => new Promise((resolve, reject) => {
        QrCode.createqr(obj,e => {
            e.code === '0000' ? resolve(e.data) : reject(e);
        });
    }).handle(),
};
