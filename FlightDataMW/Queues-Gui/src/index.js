const Arena = require('bull-arena');
const Config = require('config');
import { Logger } from './logger/loggerApi';

function init() {
    const host = Config.get('redis.host');
    const queuesConfig = Config.get('queues');
    let queues = [];
    queuesConfig.forEach(queue => {
        Logger.info(`Adding queue: ${queue.name}`);
        queues.push({
            name: queue.name,
            hostId: queue.host,
            redis: {
              host: host
            },
        });
    });
    Logger.info(`Starting Arena with queues added`);
    Arena({ queues: queues });
}

init();