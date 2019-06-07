import { AirportService } from '../services/airportService';
import * as Config from 'config';
import axios from 'axios';

export class AirportController {

    private constructor() { }

    static async getAll (ctx, next) {
        let list = (await AirportService.getAll()) || [];
        ctx.body = { size: list.length, data: list };
        await next();
    };

    static async getAirports () {
        let uri = Config.get('providers.airports-uri');

        console.log(`Getting airports from ${uri}`);

        axios.get(uri)
        .then((res) => {
            console.log(res.data);
            for (let i=0; i<res.data.length; i++) {
                AirportService.save(res.data[i]);
            }
         })
        .catch((error) => {
            console.error(error);
        });
    }

}
