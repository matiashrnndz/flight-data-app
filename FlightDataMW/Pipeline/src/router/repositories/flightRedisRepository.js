const FlightRepository = require('./flightRepository');
const Queue = require('bull');
import ForwardToProcess from '../forwardToProcess';
import * as redis from 'redis';

module.exports = class FlightRedisRepository extends FlightRepository {

    constructor() {
        super();
        this.initQueueToProcess();
        this.initRedis();
    }

    initQueueToProcess() {
        this.queueToProcess = new Queue('flights-to-process');
        this.queueToProcess.on('completed', (job, result) => {
            job.remove();
        });
    }

    initRedis() {
        this.client = redis.createClient(6379, '127.0.0.1');
        this.client.on('connect', function() {
            console.log(`flightRedisRepository connected to redis on : 127.0.0.1:6379`);
        });
        this.airlineKeys = {};
        this.refreshConfigs();
        this.refreshConfigsPeriodically();
    }

    async getAll() {
        this.queueToProcess.process(async (job, done) => {
            ForwardToProcess.forward(job.data, this.airlineKeys);
            done();
        });
    }

    async refreshConfigsPeriodically() {
        setInterval(() => { this.refreshConfigs(); }, 5000);
    }

    async refreshConfigs() {
        this.client.keys('airline-*', (err, keys) => {
            if (err) {
                return new Error(err.message);
            }
            this.airlineKeys = keys;
        });
    }

}
