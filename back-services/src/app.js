
import Koa from 'koa'
import KoaLogger from 'koa-logger'
import KoaSession from 'koa-session'





import PortUtil from './utils/port.util'

try {
    let port = PortUtil.get();
    console.log(port);
} catch (e) {
    console.log(e);
}
