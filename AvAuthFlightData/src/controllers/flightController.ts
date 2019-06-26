import { FlightService } from '../services/flightService';
import * as Config from 'config';
import axios from 'axios';

export class FlightController {

    private constructor() { }

    static async getAll (ctx, next) {
        let limit = parseInt(ctx.query.limit) || 100;
        let offset = parseInt(ctx.query.offset) || 0;
        let list = (await FlightService.getAll(limit, offset)) || [];
        ctx.body = { offset: offset, limit: limit, size: list.length, data: list };
        await next();
    };
    
    static async sendFlights () {
        let cantLotes = Config.get('carga.cantLotes');
        let tamLotes = Config.get('carga.tamLote');
        let offset = Config.get('carga.offset');
        let uri = Config.get('clients.flightDataMW-uri');

        console.log(`Sending flights to ${uri} using the following params :
            * Cantidad de Lotes = ${cantLotes}
            * Tamaño de Lotes = ${tamLotes}
            * Offset = ${offset}`);

        if (cantLotes == 0) {
            while(Config.get('carga.cantLotes') == 0) {
                await FlightController.postFlights(uri, tamLotes, offset);
                offset = offset + tamLotes;
            }
        } else {
            for (var i = 1; i <= cantLotes; i++) {
                console.log("Sending " + i + " request of " + cantLotes);
                await FlightController.postFlights(uri, tamLotes, offset);
                offset = offset + tamLotes;
            }
        }
    }

    private static async postFlights(url: string, tamLotes: Number, offset: Number) {
        let flights = await FlightService.getAll(tamLotes, offset);
        for (let i = 0; i < flights.length; i++) {
            flights[i].TIMESTAMP = new Date().getTime();
        }
        let body = {
            tamLotes : tamLotes,
            offset : offset,
            flights : flights
        }

        axios.post(url, body)
        .then((res) => { })
        .catch((error) => {
            console.error(error);
        });
    }

}
