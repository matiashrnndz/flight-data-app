import { FlightService } from '../services/flightService';
import * as async from 'async';
import { Logger } from '../logger/loggerApi';

export class FlightController {

    flightService : FlightService;

    constructor() {
        this.flightService = new FlightService();
     }

    async save (ctx, next) {
        let data = ctx.request.body;
        if (data) {
            if (data.flights) {
                async.forEachOf(data.flights, (value: any, key, callback) => {
                    Logger.info(`Request processed in ${this.time(value.TIMESTAMP)} seconds for flight ${value.id}`);
                    this.flightService.save(value);
                    callback();
                }, err => {
                    if (err) {
                        Logger.error(`Request failed to process : ${err.message}`);
                      }
                    Logger.info(`All requests has been processed`);
                });
            }
            ctx.body = data;
        } else {
            ctx.status = 400;
            ctx.body = { status: 400, message: `Invalid flights data` };
        }

        await next();
    }

    time = (sent) => {
        let received = new Date().getTime();
        let delay = (received - sent) / 1000;
        return delay;
    }

}
