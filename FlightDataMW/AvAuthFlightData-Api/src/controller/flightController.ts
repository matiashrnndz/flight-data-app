import { FlightService } from '../services/flightService';
import * as async from 'async';

export class FlightController {

    flightService : FlightService;

    constructor() {
        this.flightService = new FlightService();
     }

    async save (ctx, next) {
        let data = ctx.request.body;
        if (data) {
            if (data.flights) {
                async.forEachOf(data.flights, (value, key, callback) => {
                    this.flightService.save(value);
                    callback();
                }, err => {
                    if (err) {
                        console.log('A request failed to process');
                      } else {
                        console.log(`All requests have been processed, took ${this.time(data.timestamp)} seconds`);
                      }
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
