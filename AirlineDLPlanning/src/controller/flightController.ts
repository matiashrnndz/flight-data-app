import axios from 'axios';
const convert = require('xml-js');

export class FlightController {

    async save (ctx, next) {
        let data = ctx.request.body;
        console.log(data);
        if (data) {
            console.log(`request processed in ${this.time(data.TIMESTAMP)} seconds.`);
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
