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
    import UserService                  from 'services/user.service'
    import Store                        from 'plugins/store.plugin'
    import Mixin                        from './app.mixin'

    const $$SELECT_BANK = '$$SELECT_BANK';

    export default {
        mixins: [
            Mixin,
            PathMixin,
            UserMixin,
        ],
        created () {
            // 获取资源
            this.resourceGet(this.arrNav);
        },
        methods: {

            handleViewAppear () {
                Store.remove('MODAL_TYPE').then(() => {
                    return this.userGet();
                }).catch(() => {
                    UserService.login();
                });
            },
        },
        components: {
            WowNavBar,
        }
    }
</script>
