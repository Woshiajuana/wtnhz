<template>
    <wow-view
        view_use_scroll=""
        :view_header_center_txt="x">
        <div class="table">
            <div class="table-head">
                <div class="table-td">0</div>
                <scroller class="table-head-content" scroll-direction="horizontal">
                    <div class="table-td" ref="t1">1</div>
                    <div class="table-td">2</div>
                    <div class="table-td">3</div>
                    <div class="table-td">4</div>
                    <div class="table-td">5</div>
                    <div class="table-td">6</div>
                    <div class="table-td">7</div>
                    <div class="table-td">8</div>
                    <div class="table-td">9</div>
                </scroller>
            </div>
            <scroller  @scroll="handleScroll">
                <div class="table-body">
                    <div class="table-label">
                        <div class="table-tr">1</div>
                        <div class="table-tr">2</div>
                        <div class="table-tr">3</div>
                        <div class="table-tr">4</div>
                        <div class="table-tr">5</div>
                        <div class="table-tr">6</div>
                        <div class="table-tr">7</div>
                        <div class="table-tr">8</div>
                        <div class="table-tr">9</div>
                        <div class="table-tr">9</div>
                        <div class="table-tr">9</div>
                        <div class="table-tr">9</div>
                        <div class="table-tr">9</div>
                        <div class="table-tr">9</div>
                        <div class="table-tr">9</div>
                        <div class="table-tr">9</div>
                        <div class="table-tr">9</div>
                        <div class="table-tr">9</div>
                        <div class="table-tr">9</div>
                        <div class="table-tr">9</div>
                        <div class="table-tr">9</div>
                        <div class="table-tr">9</div>
                        <div class="table-tr">0</div>
                    </div>
                    <scroller class="fr"
                              :offset-accuracy="1"
                              @scroll="handleScroll"
                              scroll-direction="horizontal">
                        <div class="table-body-content">
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                            <div class="table-tr">
                                <div class="table-td">1</div>
                                <div class="table-td">2</div>
                                <div class="table-td">3</div>
                                <div class="table-td">4</div>
                                <div class="table-td">5</div>
                                <div class="table-td">6</div>
                                <div class="table-td">7</div>
                                <div class="table-td">8</div>
                                <div class="table-td">9</div>
                            </div>
                        </div>
                    </scroller>
                </div>
            </scroller>
        </div>
    </wow-view>
</template>

<script>
    import WowView                      from 'wow-weex-ui/lib/wow-view'

    export default {
        data () {
            return {
                x: 0,
            }
        },
        created () {
            this.x = 1
        },
        methods: {
            handleScroll (event) {
                let { x, y } = event.contentOffset;
                this.x = x;
            }
        },
        components: {
            WowView,
        },
    }
</script>

<style>
    .table{
        flex: 1;
        width: 750px;
    }
    .table-head{
        flex-direction: row;
        align-items: center;
        height: 100px;
        border-bottom-width: 1px;
    }
    .table-td{
        align-items: center;
        width: 100px;
        justify-content: center;
    }
    .table-head-content{
        flex-direction: row;
        height: 100px;
        align-items: center;
        background-color: #333333;
    }
    .table-body{
        width: 750px;
        flex-direction: row;
    }
    .table-label{
        width: 100px;
    }
    .table-tr{
        flex-direction: row;
        align-items: center;
        height: 100px;
    }
    .fr{
        flex-direction: row;
    }
    .table-body-content{
        /*flex: 1;*/
        /*flex-direction: row;*/
        /*width: 300px;*/
        /*overflow: hidden;*/
        background-color: red;
        /*margin-right: 10px;*/
    }
</style>

