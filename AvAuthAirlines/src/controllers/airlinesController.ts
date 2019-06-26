import { AirlineService } from '../services/airlinesService';

export class AirlineController {

    private constructor() {}

    static async getAll (ctx, next) {
        let airlines = await AirlineService.getAll();
        if (airlines) {
            ctx.body = airlines;
        } else {
            ctx.status = 404;
            ctx.body = { status: 404, message: `Airlines not found` };
        }
        await next();
    }

    static async getById (ctx, next) {
        let id = ctx.params.id;
        let airline = await AirlineService.getById(id);
        if (airline) {
            ctx.body = airline;
        } else {
            ctx.status = 404;
            ctx.body = { status: 404, message: `Airline not found` };
        }
        await next();
    }
    
}