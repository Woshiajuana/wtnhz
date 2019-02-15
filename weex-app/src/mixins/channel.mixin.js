
// 事件管理中心

import Channel                      from 'plugins/channel.plugin'

const data = () => {
    return {
        channel$: {
            
        },
    }
};

const methods = {

    // 监听事件
    channelAdd (event, callback) {
        this.channel$.push({ event, callback });
        Channel.add(event, callback);
    },

    // 响应事件
    channelPost (event, data = {}) {
        Channel.post(event, data);
    },

    // 销毁事件
    disMonitorEvent () {
        this.channel$.forEach((item) => {
            let { event } = item;
            Channel.remove(event);
        });
        this.channel$ = [];
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
