
// 事件管理中心

import Channel                      from 'plugins/channel.plugin'

const data = () => {
    return {
        channel$: {
            EVENT: {
                $$USER_EXIT: '$$USER_EXIT', // 用户退出
            },
            _registered: []
        },
    }
};

const methods = {

    // 监听事件
    channelAdd (event, callback) {
        if (this.channel$.EVENT[event])
            throw '事件未注册';
        this.channel$._registered.push({ event, callback });
        Channel.add(event, callback);
    },

    // 响应事件
    channelPost (event, data = {}) {
        Channel.post(event, data);
    },

    // 销毁事件
    disMonitorEvent () {
        this.channel$._registered.forEach((item) => {
            let { event } = item;
            Channel.remove(event);
        });
        this.channel$._registered = [];
    },
};

const destroyed = function () {
    // 销毁监听事件
    this.disMonitorEvent();
};

export default {
    data,
    methods,
    destroyed,
}
