import { AirlineService } from '../services/airlineService';
import * as Config from 'config';
import axios from 'axios';

export class AirlineController {

    private constructor() { }

    static async getAll (ctx, next) {
        let list = (await AirlineService.getAll()) || [];
        console.log("finished AirlineService from airline controller");
        ctx.body = { size: list.length, data: list };
        await next();
    };

    static async getAirlines () {
        let uri = Config.get('providers.airlines-uri');

        console.log(`Getting airlines from ${uri}`);

        axios.get(uri)
        .then((res) => {
            for (let i=0; i<res.data.length; i++) {
                AirlineService.save(res.data[i]);
            }
         })
        .catch((error) => {
            console.error(error);
        });
    }

}
