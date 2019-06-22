const RegisterRepository = require('./registerRepository');
const asyncRedis = require("async-redis");    
import { Logger } from '../logger/loggerApi';

module.exports = class RegisterRedisRepository extends RegisterRepository {

    constructor() {
        super();
        this.client = asyncRedis.createClient(6379, '127.0.0.1');
        this.client.on('connect', function() {
            Logger.info(`Started connection to redis on : 127.0.0.1:6379`);
        });
    }

    async register(data) {
        let key = data.options.idClient;
        let value = JSON.stringify(data);
        this.client.set(key, value);
        Logger.info(`Registered to redis client ${key}`);
        return data;
    }

    async delete(key) {
        return await this.client.del(key, function(err, number) {
            if (err) {
                Logger.error(`Repository > delete threw : ${err} for key ${key}`);
                return new Error(err.message);
            }
            if (number >= 1) {
                Logger.info(`Deleted from redis the key ${key}`);
                return { Message: `Deleted ${key}.`};
            }

            Logger.info(`There was no key ${key} in database`);
            return { Message: `There was no ${key} in database.` };
        })
    }

    async discover() {
        Logger.info(`Discovered function from redis`);
        return await this.client.get("discover-functions");
    }

}
