const FlightRepository = require('./flightRepository');
import * as Queue from 'bull';
import { Logger } from '../logger/loggerApi';

module.exports = class FlightRedisRepository extends FlightRepository {

    constructor() {
        super();
        Logger.info(`Started connection to queue flights-to-process`);
        this.queue = new Queue('flights-to-process');
    }

    async save(flight) {
        Logger.info(`Added flight ${flight.id} to flights-to-process queue`);
        this.queue.add(flight);
    }

}
