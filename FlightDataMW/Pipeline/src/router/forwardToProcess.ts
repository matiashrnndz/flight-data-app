import * as redis from 'redis';
import Pipeline from '../pipeline/pipelineTS'
import { filterFactory } from '../filters/filterFactory';
import { transformationsFactory } from '../transformations/transformationsFactory';
import { outputFields } from '../output-fields/outputFields';

let client: redis.RedisClient = redis.createClient(6379, '127.0.0.1');
client.on('connect', function() {
    console.log(`Setup connected to redis on : 127.0.0.1:6379`);
});

export default class ForwardToProcess {

    private constructor() { }

    static async forward(flight, airlineKeys: string[]) {
        for (let i = 0; i < airlineKeys.length; i++) {
            client.get(airlineKeys[i], function(err, reply) {
                let airlineConfig = JSON.parse(reply);
                if (airlineConfig.options.airline == flight.AIRLINE) {
                    flight.config = airlineConfig;
                    initPipeline(flight);
                }
            });
        }
    }
    
}

async function initPipeline(flight) {
    var pipeline = new (Pipeline())();
    pipeline.on('error', (err) => {
        console.log(`${err}`);
    });
    pipeline.on('end', (result) => {
        //console.log(`The result is ${JSON.stringify(result)}`);
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