<template>
    <wow-view
        view_use_scroll=""
        :view_style="{backgroundColor: '#f2f2f2'}"
        :view_header_wrap_style="{borderBottomWidth: 1}"
        view_header_center_txt="选择主题">
        <wow-scroll
            @refresh="handleRefresh"
            @loading="handleLoading">
            <cell>
                <wow-input-cell
                    v-for="(item, index) in arrList"
                    :key="index"
                    input_use_right=""
                ></wow-input-cell>
            </cell>
        </wow-scroll>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'
    import WowArrow                     from 'wow-weex-ui/lib/wow-arrow'
    import WowInputCell                 from 'wow-weex-ui/lib/wow-input-cell'
    import WowScroll                    from 'wow-weex-ui/lib/wow-scroll'
    import SourceMixin                  from 'mixins/source.mixin'
    import InputMixin                   from 'mixins/input.mixin'
    import Http                         from 'plugins/http.plugin'
    import Dialogs                      from 'plugins/dialogs.plugin'
    import Api                          from 'config/api.config'
    import Mixin                        from './publish.mixin'

    const srcArr = [
        { key: 'close', value: 'header-left-close.png?6', },
    ];

    export default {
        mixins: [
            Mixin,
            InputMixin,
            SourceMixin,
        ],
        data () {
            return {
                arrList: [],
                pageIndex: 1,
                pageSize: 10
            }
        },
        created () {
            this.sourceGet(srcArr);
            this.reqThemeList();
        },
        methods: {
            handleRefresh (callback) {
                this.pageIndex = 1;
                this.reqThemeList(callback);
            },
            handleLoading (callback) {
                this.pageIndex++;
                this.reqThemeList(callback);
            },
            reqThemeList (callback) {
                let options = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                };
                Http(Api.reqThemeList, options, {
                    loading: !callback,
                }).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    this.arrList = this.pageIndex === 1
                        ? data
                        : [...this.arrList, ...data];
                }).catch((err) => {
                    Dialogs.toast(err);
                }).finally(() => {
                    callback && callback();
                })
            },
        },
        components: {
            WowView,
            WowArrow,
            WowInputCell,
            WowScroll,
        },
    }
</script>
