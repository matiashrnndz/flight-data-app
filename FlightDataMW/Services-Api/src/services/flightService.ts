import { FlightController } from '../controller/flightController';
import * as convert from 'xml-js';

export class FlightService {

    flightController: FlightController;

    constructor(flightController: FlightController) {
        this.flightController = flightController;
    }

    async deliver(flight) {
        let url = `http://${flight.config.options.ip}:${flight.config.options.port}/flights`;
        let protocol = flight.config.options.protocol;
        delete flight.config;
        if (protocol == 'xml') {
            protocol = 'text/xml';
            flight = convert.js2xml(flight, { compact: true });
            flight = `<?xml version='1.0'?><flight>${flight}</flight>`;
        } else {
            protocol = 'application/json';
        }
        this.flightController.deliver(url, flight, protocol);
    }

}
