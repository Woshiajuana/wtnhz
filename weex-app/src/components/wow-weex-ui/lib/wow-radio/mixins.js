import WatchUtil               from '../../utils/watch.util'

const { _generateWatch } = WatchUtil;

const data = () => {
    return {
        d_radio_style: {},
        d_radio_item_style: {},
        d_radio_item_icon_style: {},
        d_radio_item_text_style: {},
    }
};

const watch = _generateWatch(data());

export default {
    data,
    watch,
}
