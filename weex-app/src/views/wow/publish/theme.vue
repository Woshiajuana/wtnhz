<template>
    <wow-view
        view_use_scroll=""
        :view_style="{backgroundColor: '#f2f2f2'}"
        :view_header_wrap_style="{borderBottomWidth: 1}"
        view_header_center_txt="选择主题">
        <wow-scroll
            @refresh="handleRefresh"
            @loading="handleLoading">
            <cell v-if="params$.from === 'home'">
                <wow-input-cell
                    @click="handleSelect({name: '全部', _id: ''})"
                    input_label_txt="全部"
                    input_use_right=""
                ></wow-input-cell>
            </cell>
            <cell
                v-for="(item, index) in arrList"
                :key="index">
                <wow-input-cell
                    @click="handleSelect(item)"
                    :input_label_txt="item.name"
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
    import ChannelMixin                 from 'mixins/channel.mixin'
    import RouterMixin                  from 'mixins/router.mixin'
    import Http                         from 'plugins/http.plugin'
    import Dialogs                      from 'plugins/dialogs.plugin'
    import Router                       from 'plugins/router.plugin'
    import Api                          from 'config/api.config'
    import Mixin                        from './publish.mixin'

    const srcArr = [
        { key: 'close', value: 'header-left-close.png?6', },
    ];

    export default {
        mixins: [
            Mixin,
            InputMixin,
            RouterMixin,
            SourceMixin,
            ChannelMixin,
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
            this.routerGetParams();
            this.reqThemeList();
        },
        methods: {
            handleSelect (item) {
                let { from } = this.params$;
                let event = from === 'home'
                    ? this.channel$.EVENT.$$HOME_THEME
                    : this.channel$.EVENT.$$POST_THEME;
                this.channelPost(event, item);
                Router.pop();
            },
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
                    useToken: false,
                }).then(({code, data, msg}) => {
                    if (code !== '0000')
                        throw msg;
                    this.arrList = this.pageIndex === 1
                        ? data.list
                        : [...this.arrList, ...data.list];
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
