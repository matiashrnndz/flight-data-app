import AirportService from '../services/airportService';

export default class AirportController {

    private airportService : AirportService;

    constructor() {
        this.airportService = new AirportService();
    }

    async getAll (ctx, next) {
        let airports = await this.airportService.getAll();
        if (airports) {
            ctx.body = airports;
        } else {
            ctx.status = 404;
            ctx.body = { status: 404, message: `Airports not found` };
        }
        await next();
    }

    async getById (ctx, next) {
        let id = ctx.params.id;
        let airport = await this.airportService.getById(id);
        if (airport) {
            ctx.body = airport;
        } else {
            ctx.status = 404;
            ctx.body = { status: 404, message: `Airport not found` };
        }
        await next();
    }
}