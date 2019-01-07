import WatchUtil               from '../../utils/watch.util'

const { _generateWatch } = WatchUtil;

const data = () => {
    return {
        d_radio_style: {},
        d_radio_item_style: {},
        d_radio_item_spot_style: {},
        d_radio_item_spot_checked_style: {},
        d_radio_item_spot_inner_style: {},
        d_radio_item_text_style: {},
        d_radio_item_text_checked_style: {},
    }
};

const watch = _generateWatch(data());

export default {
    data,
    watch,
}
