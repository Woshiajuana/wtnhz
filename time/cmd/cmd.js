
import path from 'path'
import cmd from '../../wow-cmd/index'

cmd({
    cmdPath: path.join(__dirname),
    options: {
        include: ['cmd.js'],
        exclude: [],
    }
});
