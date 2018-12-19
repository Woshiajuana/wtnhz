const systemShare = weex.requireModule('systemShareModule');
import './Promise'
// systemShareModule 
// 分享文本
// share(String contentText, String callbackId)
// 分享图片
// shareImage(String imageUrl, String callbackId)
export default {
    shareText: (text='') => new Promise((resolve, reject) => {
        systemShare.share(text, e => {
            e.code === '0000' ? resolve(e.data) : reject(e);
        });
    }).handle(),
    shareImage: (imageUrl='') => new Promise((resolve, reject) => {
        systemShare.shareImage(imageUrl, e => {
            e.code === '0000' ? resolve(e.data) : reject(e);
        });
    }).handle(),
};
