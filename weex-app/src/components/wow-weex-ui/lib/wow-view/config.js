/**
 * Created by Administrator on 2017/11/8.
 */
import source                       from 'utils/source.util'
import config                       from '../../config'
import Assign                       from '../../assign'
export default Assign({
    view_use_padding: true,
    view_style: {
        backgroundColor: '#f8f8f8',
    },
    view_use_scroll: true,
    view_use_left_event: true,
    view_offset_accuracy: 10,

    view_use_header: true,
    view_use_compatible: false,
    view_header_style: {
        height: 90,
        // backgroundColor: '#fff',
        borderColor: '#dedede',
        borderBottomWidth: 1,
        position: 'fixed',
        left: 0,
        top: 0,
    },

    view_header_left_style: {
        height: 90,
        top: 0,
    },
    view_header_left_src: source('view_return_icon.png'),
    view_header_left_src_style: {
        width: 48,
        height: 48,
        marginLeft: 25,
    },
    view_header_left_txt: '',
    view_header_left_txt_style: {
        color: '#3c3c3c',
        fontSize: 28,
        marginLeft: 25,
    },

    view_header_center_style: {
        height: 90,
    },
    view_header_center_txt: '',
    view_header_center_txt_style: {
        color: '#3c3c3c',
        fontSize: 34,
    },

    view_header_right_style: {
        height: 90,
        top: 0,
    },
    view_header_right_src: '',
    view_header_right_src_style: {
        width: 48,
        height: 48,
        marginRight: 25,
    },
    view_header_right_txt: '',
    view_header_right_txt_style: {
        color: '#3c3c3c',
        fontSize: 28,
        marginRight: 25,
    },
}, config)
