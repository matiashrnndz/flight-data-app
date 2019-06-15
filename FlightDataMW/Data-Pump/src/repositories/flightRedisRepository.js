const FlightRepository = require('./flightRepository');
const Queue = require('bull');

module.exports = class FlightRedisRepository extends FlightRepository {

    producer = {};

    constructor() {
        super();
        this.queue = new Queue('new-flights');

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
            this.producer.publish(job.data);
            done();
        });
    }

    setProducer(producer) {
        this.producer = producer;
    }

}
