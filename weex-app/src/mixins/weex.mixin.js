
const data = () => {
    return {
        weex$: {}
    }
};

const methods = {
    weexGet () {
        this.weex$ = weex.config.env;
    }
};

export default {
    data,
    methods,
}
