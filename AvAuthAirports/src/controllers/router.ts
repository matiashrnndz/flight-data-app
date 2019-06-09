import { AirportController } from './airportController';
import * as Router from 'koa-router';

export const router = new Router();

router.get('/airports', (ctx, next) => AirportController.getAll(ctx, next));
router.get('/airports/:id', (ctx, next) => AirportController.getById(ctx, next));
