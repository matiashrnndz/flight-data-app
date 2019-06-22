const FlightRepository = require('./flightRepository');
import * as Queue from 'bull';
import { Logger } from '../logger/loggerApi';

module.exports = class FlightRedisRepository extends FlightRepository {

    constructor(flightService) {
        super();
        this.flightService = flightService;
        this.initQueueToDeliver();
    }

    initQueueToDeliver() {
        this.queueToDeliver = new Queue('flights-to-deliver');
        Logger.info("Started connection to queue flights-to-deliver");
        this.queueToDeliver.on('completed', (job, result) => {
            job.remove();
        });
    }

    async getAll() {
        this.queueToDeliver.process(async (job, done) => {
            this.flightService.deliver(job.data);
            done();
        });
    }

}
