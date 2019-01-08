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
                        img_src: Source('menu-icon-wow.png'),
                        img_checked_src: Source('menu-icon-wow-checked.png'),
                        checked: true,
                    },
                    {
                        txt: '发现',
                        src: 'wow_mine_data',
                        img_src: Source('menu-icon-component.png'),
                        img_checked_src: Source('menu-icon-component-checked.png'),
                        checked: false,
                    },
                    {
                        txt: '我的',
                        src: 'wow_mine',
                        img_src: Source('menu-icon-plugins.png'),
                        img_checked_src: Source('menu-icon-plugins-checked.png'),
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
