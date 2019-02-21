
const filters = {
    filterCutOut (value, max) {
        return value
            ? `${value.substring(0, max)}${value.length > max ? '...' : ''}`
            : '';
    },
};

export default {
    filters,
}
