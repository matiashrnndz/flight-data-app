export async function initServer() {
    const Koa = require('koa');
    const logger = require('koa-logger');
    const json = require('koa-json');
    const bodyParser = require('koa-bodyparser');
    const router = require('./controllers/router');
    const argv = require('minimist')(process.argv.slice(2));
    
    const app = new Koa();
    const port = argv.port ? parseInt(argv.port) : 8082;
    
    app.use(logger());
    app.use(bodyParser());
    app.use(json({ pretty: true }));
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(port);
    
    console.log(`Server started, see http://localhost:${port}
        Endpoints:
            * GET  /airlines
            * GET  /airlines/:id`);
}
