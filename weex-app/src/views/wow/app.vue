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

    const $$SELECT_BANK = '$$SELECT_BANK';

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
            // 监听事件
            this.channelAdd(this.channel$.EVENT.$$USER_EXIT, this.channelUserExitHandle.bind(this));
        },
        methods: {

            handleViewAppear () {
                this.channelUserExitHandle();
            },

            channelUserExitHandle () {
                console.log('重新登录')
                Store.remove('MODAL_TYPE').then(() => {
                    return this.userGet();
                }).catch(() => {
                    UserService.login();
                });
            }
        },
        components: {
            WowNavBar,
        }
    }
</script>
