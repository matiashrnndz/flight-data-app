import * as redis from 'redis';
import Pipeline from '../pipeline/pipeline'
import { filterFactory } from '../filters/filterFactory';
import { transformationsFactory } from '../transformations/transformationsFactory';
import { outputFields } from '../output-fields/outputFields';
import { Logger } from '../logger/loggerApi';

let client: redis.RedisClient = redis.createClient(6379, '127.0.0.1');
client.on('connect', function() {
    Logger.info(`Setup connected to redis on : 127.0.0.1:6379`);
});

export default class ForwardToProcess {

    private constructor() { }

    static async forward(flight, airlineKeys: string[]) {
        for (let i = 0; i < airlineKeys.length; i++) {
            client.get(airlineKeys[i], function(err, reply) {
                let airlineConfig = JSON.parse(reply);
                if (airlineConfig.options.airline == flight.AIRLINE) {
                    flight.config = airlineConfig;
                    Logger.info(`Pipeline initialized with flight : ${flight.id}`);
                    initPipeline(flight);
                }
            });
        }
    }
    
}

async function initPipeline(flight) {
    var pipeline = new (Pipeline())();
    pipeline.on('error', (err) => {
        Logger.error(`Pipeline : ${err}`);
    });
    pipeline.on('end', (result) => {
        Logger.info(`Pipeline Result : ${JSON.stringify(result)}`);
    });
    if(flight.config.filters) {
        for (let i = 0; i < flight.config.filters.length; i++) {
            pipeline.useFilter(filterFactory[flight.config.filters[i].type]);
        }
    }
    if(flight.config.transformations) {
        for (let i = 0; i < flight.config.transformations.length; i++) {
            pipeline.useTransformation(transformationsFactory[flight.config.transformations[i].type]);
        }
    }
    pipeline.useOutputFields(outputFields);
    pipeline.run(flight);
}
