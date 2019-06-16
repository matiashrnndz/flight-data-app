import { RegisterService } from '../services/registerService';

export class RegisterController {

    registerService : RegisterService;

    constructor() {
        this.registerService = new RegisterService();
     }

     async register (ctx, next) {
        let data = ctx.request.body;
        if (data) {
            let dataProcessed = await this.registerService.register(data);
            ctx.body = dataProcessed;
        } else {
            ctx.status = 400;
            ctx.body = { status: 400, message: `Invalid registers data` };
        }

        await next();
    }

    async delete (ctx, next) {
        let id = ctx.params.id;
        if (id) {
            ctx.body = await this.registerService.delete(id);
        } else {
            ctx.status = 400;
            ctx.body = { status: 400, message: `Invalid update data` };
        }
        await next();
    }

}
