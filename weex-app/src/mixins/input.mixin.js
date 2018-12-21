
const methods = {
    handleInput (key, event) {
        let value = typeof event === 'object'
            ? event.value
            : event;
        typeof key === 'object'
            ? key.value = value
            : this[key] = value;
    },
};

export default {
    methods,
}
