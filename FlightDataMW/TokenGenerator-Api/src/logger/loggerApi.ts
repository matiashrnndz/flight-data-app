import * as Config from 'config';

const LoggerImplementation = require('./logic/logger')(Config.get("logger.type"));
const logger = new LoggerImplementation();

export class Logger {

    private constructor() {}

    static async info(msg) {
        logger.info(msg);
    }

    static async error(msg) {
        logger.error(msg);
    }

}