import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';
import { router } from './controllers/router';
import * as minimist from 'minimist';

export async function initServer() {

    const argv = minimist(process.argv.slice(2));
    const app = new Koa();
    const port = argv.port ? parseInt(argv.port) : 8081;
        
    app.use(logger());
    app.use(bodyParser());
    app.use(json({ pretty: true }));
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(port);
    
    console.log(`Server started, see http://localhost:${port}
        Endpoints:
            * GET  /airports
            * GET  /airports/:id`);
}
