import AirlineService from '../services/airlinesService';

export default class AirlineController {

    private airlineService : AirlineService;

    constructor() {
        this.airlineService = new AirlineService();
    }

    async getAll (ctx, next) {
        let airlines = await this.airlineService.getAll();
        if (airlines) {
            ctx.body = airlines;
        } else {
            ctx.status = 404;
            ctx.body = { status: 404, message: `Airlines not found` };
        }
        await next();
    }

    async getById (ctx, next) {
        let id = ctx.params.id;
        let airline = await this.airlineService.getById(id);
        if (airline) {
            ctx.body = airline;
        } else {
            ctx.status = 404;
            ctx.body = { status: 404, message: `Airline not found` };
        }
        await next();
    }
}