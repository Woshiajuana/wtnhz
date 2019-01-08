
import location                 from 'plugins/location.plugin'
import openPay                  from 'plugins/pay.plugin'
import auth                     from 'services/auth.service'
import config                   from 'config/env.config'
import _                        from 'utils/lodash.util'

export default {
    pay: (params) => new Promise((resolve, reject) => {
        let loc = '';
        location.get().then((res) => {
            loc = res;
            return openPay.set(config.OPEN_PAY, config.OPEN_PAY_UPLOAD);
        }).then(() => {
            if(!params.orgCode){
                params.orgCode = config.ORG_CODE;
                params.orgId = config.ORG_CODE;
            }
            let payInfo = {
                snList: '', // SN号
                amount: '', // 金额
                merchantOrderId: '', // 订单信息
                goodsDesc: '', // 商品描述(暂不传)
                merchantCode: '', // 收款人商户号8667071901290139
                fromMerchantCode: '', // 付款人商户号8667071901290139
                merchantName: '', // 店铺名
                merchantMessage: '', //认证参数
                mobileNo: '', // 收款人
                fromMobileNo: '', // 付款人
                city: `${loc.province}|${loc.city}|${loc.subLocality}`,
                payType: '0,1,4', // 支付类型 '0'表示微信  '1'表示只支持刷卡  '01'表示都支持 '2' NFC '3'银联二维码 '4'支付宝
                latitude: loc.latitude,
                longitude: loc.longitude,
                reOrPayFlag: '0', //收款：0 付款：1
                ...params
            };
            return openPay.pay(payInfo);
        }).then((data) => {
            try {
                if (data.code === '0001') return reject({
                    code: 'ds_system',
                    msg: '网络异常'
                });
                if (data.code === '0002') return reject({
                    code: 'ds_system',
                    msg: typeof data.result === 'string' ? data.result : '交易取消'
                });
                const data2 = getJson(data.result);
                const mate = getJson(data2.mate);
                const result = getJson(data2.result);
                if (mate.code !== '0000') return reject(mate);
                let link = '';
                if (data.type == '0') {
                    link = decodeImageUrl(result.codeImgUrl);
                }
                resolve({
                    type: data.type,
                    msg: mate.msg,
                    link: link
                });
            } catch (e) {
                throw '解析数据异常';
            }
        }).catch((error) => {
            reject({msg: error});
        })
    }),
    query: () => new Promise((resolve, reject) => {
        let info = '';
        auth.getToken().then(result => {
            info = result;
            return openPay.set(config.OPEN_PAY, config.OPEN_PAY_UPLOAD);
        }).then(() => {
            let option = {
                mobileNo: info.encryptMobileNo,
                merchantCode: info.payCustomerId,
                orgCode: config.ORG_CODE,
                orgId : config.ORG_CODE,
            };
            return openPay.query(option)
        }).then((data1) => {
            if (data1.code === '0001') {
                return reject({
                    code: 'ds_system',
                    msg: '网络异常'
                });
            }
            const data2 = getJson(data1.result);
            const mate = getJson(data2.mate);
            const result = getJson(data2.result);
            const endData = getJson(result.message);
            if (mate.code !== '0000') return reject(mate);
            resolve(endData)
        }).catch(() => {
            reject();
        })
    })
}
function getJson(input) {
    if (_.getType(input) === 'object') return input;
    try {
        return JSON.parse(input);
    } catch (e) {
        return {}
    }
}
function decodeImageUrl(input) {
    let output = input;
    try {
        if (input.indexOf('jfzf') !== -1) {
            output = output.replace(/jfzf/g,"h5pay.html?ur=jfzf");
        } else {
            output = output.replace(/weixin/g,"h5pay.html?ur=weixin");
        }
    } catch (e) {

    }
    return output
}
