import { AirlineController } from './airlinesController';
import * as Router from 'koa-router';

export const router = new Router();

router.get('/airlines', (ctx, next) => AirlineController.getAll(ctx, next));
router.get('/airlines/:id', (ctx, next) => AirlineController.getById(ctx, next));
