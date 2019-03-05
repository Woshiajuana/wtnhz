
const animation = weex.requireModule('animation');

const methods = {
    animationRun ($el) {
        animation.transition($el, {
            styles: {
                opacity: '1',
                transform: 'translate(0, 0, 0)',
                transformOrigin: 'center center'
            },
            duration: 200,
            timingFunction: 'ease-in',
            delay: 0
        }, () => {})
    },
};

export default {
    methods,
}
