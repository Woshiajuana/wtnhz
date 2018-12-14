
import PortUtil from './utils/port.util'

try {
    let port = PortUtil.get();
    console.log(port);
} catch (e) {
    console.log(e);
}
