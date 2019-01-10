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
    import Mixin                        from './app.mixin'
    export default {
        mixins: [
            Mixin,
            PathMixin,
            UserMixin,
        ],
        data () {
            return {

            }
        },
        created () {
            this.resourceGet(this.arrNav);
        },
        methods: {
            handleViewAppear () {
                this.user$Get().catch(() => {
                    this.user$Logout();
                });
            }
        },
        components: {
            WowNavBar,
        }
    }
</script>
