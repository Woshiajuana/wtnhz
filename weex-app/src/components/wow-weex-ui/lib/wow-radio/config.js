
import config                       from '../../config'
import Assign                       from '../../assign'
export default Assign({
    radio_arr: [],
    radio_txt_key: 'text',
    radio_value: '',
    radio_style: {
        width: 102,
        height: 62,
        backgroundColor: '#ccc',
        borderRadius: 62,
        paddingLeft: 3,
        paddingRight: 3,
        alignItems: 'center',
        flexDirection: 'row',
    },
    radio_item_style: {
        justifyContent: 'flex-end',
        backgroundColor: '#5cc8ff',
    },
    radio_item_icon_style: {
        width: 56,
        height: 56,
        backgroundColor: '#fff',
        borderRadius: 56,
    },
    radio_item_text_style: false,
}, config)
