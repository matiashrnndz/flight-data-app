import * as Router from 'koa-router';
import { FlightController } from './flightController';

export const router = new Router();
const flightController = new FlightController();

router.post('/flights', (ctx, next) => flightController.save(ctx, next));