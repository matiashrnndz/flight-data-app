import axios from 'axios';
import * as convert from 'xml-js';
import { Logger } from '../logger/loggerApi';

export class FlightController {

    constructor() { }

    async deliver(url: string, flight) {
        axios.post(url, flight)
        .then((res) => {
            Logger.info(`Flight dlivered to ${url} correctly : ${JSON.stringify(flight)}`);
        })
        .catch((error) => {
            Logger.error("FlightController > deliver threw " + error);
        });

    }

}
