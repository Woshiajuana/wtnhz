
const data = () => {
    return {
        weex$: {},
        height$: 0,
    }
};

const methods = {
    weexGet () {
        this.weex$ = weex.config.env;
        let {
            deviceWidth,
            deviceHeight,
        } = this.weex$;
        this.height$ = 750 / deviceWidth * deviceHeight;
    }
};

export default {
    data,
    methods,
}
