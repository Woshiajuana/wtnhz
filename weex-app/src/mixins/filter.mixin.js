
export const filterCutOut = (value, max) => {
    return value
        ? `${value.substring(0, max)}${value.length > max ? '...' : ''}`
        : '';
};
const filters = {
    filterCutOut,
};

export default {
    filters,
}
