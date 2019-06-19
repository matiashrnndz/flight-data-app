import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import { router } from './controller/router';
import * as minimist from 'minimist';

export async function initServer() {

    const argv = minimist(process.argv.slice(2));
    const app = new Koa();
    const port = argv.port ? parseInt(argv.port) : 8097;
        
    app.use(logger());
    app.use(bodyParser());
    app.use(json({ pretty: true }));
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(port);
    
    console.log(`Server started, see http://localhost:${port}
        Endpoints:
            * POST  /register
            * POST  /delete/:id
            * GET   /discover`);
}
