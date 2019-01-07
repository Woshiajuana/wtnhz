<template>
    <wow-nav-bar
        :nav_arr="arrNav">
    </wow-nav-bar>
</template>
<script>
    import WowNavBar                    from 'components/wow-weex-ui/lib/wow-nav-bar'
    import RenderServiceMixin           from 'wow-weex-plugin/services/render.service.mixin'
    import BarMixin                     from 'wow-weex-plugin/mixins/bar.mixin'
    import Source                       from 'utils/source.util'
    import Mixin                        from './app.mixin'
    export default {
        mixins: [
            Mixin,
            RenderServiceMixin,
            BarMixin,
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
                        color: '#d6d6cf',
                        checked_color: '#5cc8ff',
                    },
                    {
                        txt: '发现',
                        src: 'wow_component',
                        img_src: Source('menu-icon-component.png'),
                        img_checked_src: Source('menu-icon-component-checked.png'),
                        checked: false,
                        color: '#d6d6cf',
                        checked_color: '#5cc8ff',
                    },
                    {
                        txt: '我的',
                        src: 'wow_plugin',
                        img_src: Source('menu-icon-plugins.png'),
                        img_checked_src: Source('menu-icon-plugins-checked.png'),
                        checked: false,
                        color: '#d6d6cf',
                        checked_color: '#5cc8ff',
                    },
                ]
            }
        },
        created () {
            this.renderView('wow_app', 'arr_nav');
            this.barSet();
        },
        components: {
            WowNavBar,
        }
    }
</script>
