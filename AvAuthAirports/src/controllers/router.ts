import AirportController from './airportController';
import Router = require('koa-router');

const router = new Router();
const airportController = new AirportController();

router.get('/airports', (ctx, next) => airportController.getAll(ctx, next));
router.get('/airports/:id', (ctx, next) => airportController.getById(ctx, next));

module.exports = router;