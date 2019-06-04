import AirlineController from './airlinesController';
import Router = require('koa-router');

const router = new Router();
const airlineController = new AirlineController();

router.get('/airlines', (ctx, next) => airlineController.getAll(ctx, next));
router.get('/airlines/:id', (ctx, next) => airlineController.getById(ctx, next));

module.exports = router;