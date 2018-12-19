
const methods = {
    handleInput (key, event) {
        this[key] = typeof event === 'object' ? event.value : event;
    },
};

export default {
    methods,
}
