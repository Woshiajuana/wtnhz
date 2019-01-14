
const methods = {
    handleInput (key, event, disabled) {
        if (disabled) return;
        console.log(key, event, disabled)
        let value = typeof event === 'object'
            ? event.value
            : event;
        typeof key === 'object'
            ? key.value = value
            : this[key] = value;
        this.inputCallback && this.inputCallback(key, event);
    },
};

export default {
    methods,
}
