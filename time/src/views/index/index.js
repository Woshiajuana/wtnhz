import $ from 'jquery'
// import Swiper from 'swiper'
import jm from 'jquery-mousewheel'
jm($)
console.log(jm)

const IMAGE_ARR = [
    {
        "url": "http://dummyimage.com/1920x1080/79d2f2"
    },
    {
        "url": "http://dummyimage.com/1920x1080/f2ee79"
    },
    {
        "url": "http://dummyimage.com/1920x1080/ca79f2"
    },
];


const BannerController = {
    init () {
        this.addEvent();
    },
    addEvent () {
        console.log(2)
        $('.main-wrap').on('mousewheel', this.handleScroll.bind(this));
    },
    handleScroll (e) {
        console.log(e)
    },
};
BannerController.init();
