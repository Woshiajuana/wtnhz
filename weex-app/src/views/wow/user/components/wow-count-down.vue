<template>
    <div class="wrap">
        <div class="inner"></div>
        <div class="inner"></div>
    </div>
</template>

<script>
    import config                       from './config'
    import Mixin                        from './mixins'
    import EmitMixin                    from './../../mixins/emit.mixin'
    import AssignMixin                  from './../../mixins/assign.mixin'

    export default {
        data () {
            return {

            }
        },
        props: {
            count_max: { default: 60 },
            count_txt: { default: '获取验证码' },
            count_disabled_txt: { default: '' },
        }
    }
</script>

<style>
    .wrap{

    }
    .inner{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        align-items: center;
        justify-content: center;
    }
</style>
