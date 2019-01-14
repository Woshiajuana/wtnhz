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
    import StorePlugin                  from 'plugins/store.plugin'
    import Mixin                        from './app.mixin'
    export default {
        mixins: [
            Mixin,
            PathMixin,
            UserMixin,
        ],
        created () {
            this.resourceGet(this.arrNav);
        },
        methods: {
            handleViewAppear () {
                StorePlugin.remove('MODAL_TYPE').then(() => {
                    return this.userGet();
                }).then((info) => {
                    console.log(info);
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
