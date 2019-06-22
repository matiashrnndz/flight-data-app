import { RegisterService } from '../services/registerService';
const jwtadapter = require('./auth/jwt-adapter');

export class RegisterController {

    registerService : RegisterService;

    constructor() {
        this.registerService = new RegisterService();
     }

     async register (ctx, next) {
        let option = {
            issuer: "AS_Obl",
            subject: ctx.get('IATA_CODE'),
            audience: 'http://localhost:8097'
        }
        let token = ctx.get('Authorization');
        if (jwtadapter.verify(token, option)) {
            let data = ctx.request.body;
            if (data) {
                let info = jwtadapter.decode(token).payload;
                let dataProcessed = await this.registerService.register(info.IATA_CODE, info.SERVICE_ID, data);
                ctx.body = dataProcessed;
            } else {
                ctx.status = 400;
                ctx.body = { status: 400, message: `Invalid registers data` };
            }
        } else {
            ctx.status = 403;
            ctx.body = { status: 403, message: 'Not authorized' };
        }
        await next();
    }

    async delete (ctx, next) {
        let option = {
            issuer: "AS_Obl",
            subject: ctx.get('IATA_CODE'),
            audience: 'http://localhost:8097'
        }
        let token = ctx.get('Authorization');
        if (jwtadapter.verify(token, option)) {
            let info = jwtadapter.decode(token).payload;
            ctx.body = await this.registerService.delete(info.SERVICE_ID);
        } else {
            ctx.status = 403;
            ctx.body = { status: 403, message: 'Not authorized' };
        }
        await next();
    }

    async discover (ctx, next) {
        let option = {
            issuer: "AS_Obl",
            subject: ctx.get('IATA_CODE'),
            audience: 'http://localhost:8097'
        }
        let token = ctx.get('Authorization');
        if (jwtadapter.verify(token, option)) {
            ctx.body = await this.registerService.discover();
        } else {
            ctx.status = 403;
            ctx.body = { status: 403, message: 'Not authorized' };
        }
        await next();
    }

}
