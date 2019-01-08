<template>
    <wow-nav-bar
        :nav_arr="arrNav">
    </wow-nav-bar>
</template>
<script>
    import WowNavBar                    from 'wow-weex-ui/lib/wow-nav-bar'
    import Source                       from 'utils/source.util'
    import PathMixin                    from 'mixins/path.mixin'
    import Mixin                        from './app.mixin'
    export default {
        mixins: [
            Mixin,
            PathMixin,
        ],
        data () {
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
                        txt: '发现',
                        src: 'wow_find',
                        img_src: Source('menu-find-icon.png?1'),
                        img_checked_src: Source('menu-find-checked-icon.png?1'),
                        checked: false,
                    },
                    {
                        txt: '我的',
                        src: 'wow_mine',
                        img_src: Source('menu-mine-icon.png?1'),
                        img_checked_src: Source('menu-mine-checked-icon.png?1'),
                        checked: false,
                    },
                ]
            }
        },
        created () {
            this.resourceGet(this.arrNav);
        },
        components: {
            WowNavBar,
        }
    }
</script>
