const FlightRepository = require('./flightRepository');
const Queue = require('bull');
import ForwardToProcess from '../forwardToProcess';
import * as redis from 'redis';
import { Logger } from '../../logger/loggerApi'

module.exports = class FlightRedisRepository extends FlightRepository {
    
    constructor() {
        super();
        this.initQueueToProcess();
        this.initRedis();
        this.startRedisProcesses();
    }

    initQueueToProcess() {
        this.queueToProcess = new Queue('flights-to-process');
        Logger.info('Started connection to queue flights-to-process');
        this.queueToProcess.on('completed', (job, result) => {
            job.remove();
        });
    }

    initRedis() {
        this.client = redis.createClient(6379, '127.0.0.1');
        this.client.on('connect', function() {
            Logger.info('Started connection to redis on : 127.0.0.1:6379');
        });
    }

    startRedisProcesses() {
        this.airlineKeys = {};
        this.refreshConfigs();
        this.refreshConfigsPeriodically();
        this.updateDescriptionsPeriodically();
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
                Logger.error("Repository > RefreshConfigs threw : " + err.message);
                return new Error(err.message);
            }
            this.airlineKeys = keys;
        });
    }

    async setDescriptions(registerFormat, filterDescription, transformationDescription, outputFieldsDescription) {
        this.descriptionValue = registerFormat + filterDescription + transformationDescription + outputFieldsDescription;
    }

    async updateDescriptionsPeriodically() {
        setInterval(() => { this.updateDescriptionsInRedis(); }, 10000);
    }

    async updateDescriptionsInRedis() {
        Logger.info("Set discover-functions into Redis");
        this.client.set('discover-functions', this.descriptionValue);
    }

}
