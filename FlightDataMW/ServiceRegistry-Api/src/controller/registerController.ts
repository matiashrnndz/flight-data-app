import { RegisterService } from '../services/registerService';
const jwtadapter = require('./auth/jwt-adapter');
import { Logger } from '../logger/loggerApi';

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
                Logger.info(`Airline ${info.IATA_CODE} with service ID ${info.SERVICE_ID} requested a register of service`);
                let dataProcessed = await this.registerService.register(info.IATA_CODE, info.SERVICE_ID, data);
                ctx.body = dataProcessed;
            } else {
                Logger.error(`Not valid registers data`);
                ctx.status = 400;
                ctx.body = { status: 400, message: `Invalid registers data` };
            }
        } else {
            Logger.error(`Not authorized request for register of service.`);
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
            Logger.info(`Airline ${info.IATA_CODE} with service ID ${info.SERVICE_ID} requested a delete of service`);
            ctx.body = await this.registerService.delete(info.SERVICE_ID);
        } else {
            Logger.error(`Not authorized request for delete of service.`);
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
            Logger.info(`Airline ${ctx.get('IATA_CODE')} requested a discovery of service`);
            ctx.body = await this.registerService.discover();
        } else {
            Logger.error(`Not authorized request for discovery of service.`);
            ctx.status = 403;
            ctx.body = { status: 403, message: 'Not authorized' };
        }
        await next();
    }

}
