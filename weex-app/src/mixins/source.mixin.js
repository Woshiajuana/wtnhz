import Source                       from 'utils/source.util'

const data = () => {
    return {
        src$: {},
    }
};

const methods = {
    sourceGet (arr = []) {
        arr.forEach((item) => {
            let { key, value, use } = item;
            use !== false && (value = Source(value));
            this.$set(this.src$, key, value);
        });
    },
};

export default {
    data,
    methods,
}
