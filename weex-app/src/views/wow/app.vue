<template>
    <wow-nav-bar
        @viewappear="handleViewAppear"
        :nav_arr="arrNav">
    </wow-nav-bar>
</template>
<script>

    import WowNavBar                    from 'wow-weex-ui/lib/wow-nav-bar'
    import PathMixin                    from 'mixins/path.mixin'
    import UserMixin                    from 'mixins/user.mixin'
    import ChannelMixin                 from 'mixins/channel.mixin'
    import UserService                  from 'services/user.service'
    import Store                        from 'plugins/store.plugin'
    import Mixin                        from './app.mixin'
    import Defer                        from 'utils/defer.util'
    import Router                       from 'plugins/router.plugin'

    const defer = new Defer(1000);

    export default {
        mixins: [
            Mixin,
            PathMixin,
            UserMixin,
            ChannelMixin,
        ],
        created () {
            // 获取资源
            this.resourceGet(this.arrNav);
            // 监听用户退出事件，调登录
            this.channelAdd(this.channel$.EVENT.$$USER_EXIT, this.channelUserExit.bind(this));
        },
        methods: {

            handleViewAppear () {

            },

            channelUserExit () {
                if (!defer.do('$$USER_EXIT'))
                    return null;
                console.log('响应事件')
                Router.root();
                setTimeout(() => {
                    UserService.login();
                },1000)
            }
        },
        components: {
            WowNavBar,
        }
    }
</script>
