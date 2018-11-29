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
    pathname: window.document.location.pathname,
    index: 0,
    init () {
        this.addEvent();
    },
    addEvent () {
        $('.main-wrap').on('mousewheel', this.handleScroll.bind(this));
        // 点击浏览器的前进后退按钮处理
        window.addEventListener('popstate', this.handlePopState.bind(this));
    },
    handleScroll (e) {
        let res = IMAGE_ARR[this.index];
        let state = {
            url: location.href + res.page,
            title: res.page,
        };
        this.pushState(state);
    },
    handlePopState (e) {
        console.log(e);
        // if (location.pathname !== this.pathname && !e.state) {
        //     this.loadPage(location.pathname, false, e.state.id);
        // }
    },
    pushState (state) {
        window.history.pushState(state, state.title, state.url);
    }
};
BannerController.init();
