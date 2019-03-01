
import Source                       from 'utils/source.util'

const data = () => {
    return {
        arrNav: [
            {
                txt: '首页',
                src: 'wow_home',
                img_src: Source('menu-home-icon.png'),
                img_checked_src: Source('menu-home-checked-icon.png'),
                checked: true,
            },
            {
                txt: '消息',
                src: 'wow_information',
                img_src: Source('menu-notice-icon.png?1'),
                img_checked_src: Source('menu-notice-checked-icon.png'),
                checked: false,
            },
            // {
            //     txt: '发现',
            //     src: 'wow_find',
            //     img_src: Source('menu-find-icon.png?1'),
            //     img_checked_src: Source('menu-find-checked-icon.png?1'),
            //     checked: false,
            // },
            {
                txt: '我的',
                src: 'wow_mine',
                img_src: Source('menu-mine-icon.png?2'),
                img_checked_src: Source('menu-mine-checked-icon.png?1'),
                checked: false,
            },
        ]
    }
};

const methods = {

};

export default {
    data,
    methods,
}
