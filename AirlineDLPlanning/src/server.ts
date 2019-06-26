import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import { router } from './controller/router';
import * as minimist from 'minimist';
const xmlParser = require('koa-xml-body')

export async function initServer() {

    const argv = minimist(process.argv.slice(2));
    const app = new Koa();
    const port = argv.port ? parseInt(argv.port) : 8072;
        
    app.use(logger());
    app.use(xmlParser());
    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(port);
    
    console.log(`Server started, see http://localhost:${port}
        Endpoints:
            * POST  /flights`);
}
