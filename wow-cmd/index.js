
import path from 'path'
import walk from './utils/walk.util'

export default () => {
    const libPath = path.join(__dirname, '/lib');
    const result = walk.run(libPath, {
        include: ['cmd.js'],
        exclude: [],
    });
    return result;
};
