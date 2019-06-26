import * as Router from 'koa-router';
import { FlightController } from './flightController';

export const router = new Router();

router.get('/flights', (ctx, next) => FlightController.getAll(ctx, next));