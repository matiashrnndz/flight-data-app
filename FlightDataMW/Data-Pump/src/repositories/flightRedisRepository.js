const FlightRepository = require('./flightRepository');
const Queue = require('bull');
import RouterApi from '../RouterApi/routerApi';

module.exports = class FlightRedisRepository extends FlightRepository {

    constructor() {
        super();
        this.routerApi = new RouterApi();
        this.queue = new Queue('flights');

        this.queue.on('drained', (job) => {
            console.log(`All requests have been processed`);
        });

        this.queue.on('completed', (job, result) => {
            console.log(`Job completed with result ${result}`);
            job.remove();
        });
    }

    async getAll() {
        this.queue.process(async (job, done) => {
            this.routerApi.process(job.data);
            done();
        });
    }

}
