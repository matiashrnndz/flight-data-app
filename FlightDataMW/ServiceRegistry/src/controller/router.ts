import * as Router from 'koa-router';
import { RegisterController } from './registerController';

export const router = new Router();
const registerController = new RegisterController();

router.post('/register', (ctx, next) => registerController.register(ctx, next));
router.post('/delete/:id', (ctx, next) => registerController.delete(ctx, next));