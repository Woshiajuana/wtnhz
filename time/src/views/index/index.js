import $ from 'jquery'
import $jm from 'assets/lib/jquery.mousewheel'
$jm($);

const IMAGE_ARR = [
    {
        "url": "http://dummyimage.com/1920x1080/79d2f2",
        "page": "1",
    },
    {
        "url": "http://dummyimage.com/1920x1080/f2ee79",
        "page": "2",
    },
    {
        "url": "http://dummyimage.com/1920x1080/ca79f2",
        "page": "3",
    },
];


const BannerController = {
    init () {
        this.addEvent();
    },
    addEvent () {
        console.log(2)
        $('.main-wrap').on('mousewheel', this.handleScroll.bind(this));

        // 点击浏览器的前进后退按钮处理
        window.onpopstate = function (e) {
            console.log(e);
            if (e.state) {
                document.title = e.state.title;
                $.ajax({
                    type: "get",
                    url: e.state.url,
                    success: function (data) {
                        $("#page").html(data)
                    },
                    error: function (data) {

                    }
                })
            }
        }
        //处理点浏览器返回时候最后一个不刷新页面内容问题
        var state = {
            title: document.title,
            url: document.location.href,
            otherkey: null
        };
        history.replaceState(state, document.title, document.location.href);

    },
    handleScroll (e) {
        console.log(e)
    },
};
BannerController.init();
