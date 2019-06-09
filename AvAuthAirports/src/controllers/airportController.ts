import { AirportService } from '../services/airportService';

export class AirportController {

    private constructor() {}

    static async getAll (ctx, next) {
        let airports = await AirportService.getAll();
        if (airports) {
            ctx.body = airports;
        } else {
            ctx.status = 404;
            ctx.body = { status: 404, message: `Airports not found` };
        }
        await next();
    }

    static async getById (ctx, next) {
        let id = ctx.params.id;
        let airport = await AirportService.getById(id);
        if (airport) {
            ctx.body = airport;
        } else {
            ctx.status = 404;
            ctx.body = { status: 404, message: `Airport not found` };
        }
        await next();
    }
}