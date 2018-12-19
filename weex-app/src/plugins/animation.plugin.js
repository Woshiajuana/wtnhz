
const animation = weex.requireModule('animation');

export default {
    run: (el, options) => new Promise((resolve, reject) => {
        animation.transition(el, options, () => {
            resolve();
        })
    }),
}
