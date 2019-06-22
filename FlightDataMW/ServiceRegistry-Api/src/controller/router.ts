import * as Router from 'koa-router';
import { RegisterController } from './registerController';

export const router = new Router();
const registerController = new RegisterController();

router.post('/register', (ctx, next) => registerController.register(ctx, next));
router.post('/delete', (ctx, next) => registerController.delete(ctx, next));
router.get('/discover', (ctx, next) => registerController.discover(ctx, next));