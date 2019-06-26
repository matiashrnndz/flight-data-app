import axios from 'axios';
import * as convert from 'xml-js';
import { Logger } from '../logger/loggerApi';

export class FlightController {

    constructor() { }

    async deliver(url: string, flight, protocol: string) {
        axios.post(url, flight, {
            headers: { "Content-Type": protocol }
        })
        .then((res) => {
            Logger.info(`Flight dlivered to ${url} correctly : ${JSON.stringify(flight)}`);
        })
        .catch((error) => {
            Logger.error("FlightController > deliver threw " + error);
        });

    }

}
