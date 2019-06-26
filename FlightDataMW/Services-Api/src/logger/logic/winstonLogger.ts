import { createLogger, format, transports } from 'winston';
import winston = require('winston');
import * as moment from 'moment';
const util = require('util');
const LoggerInterface = require('./loggerInterface');

module.exports = class WinstonLogger extends LoggerInterface {

    winstonLogger: winston.Logger;

    constructor() {
        super();

        this.winstonLogger = createLogger({
            format: format.combine(
                winston.format(function(info, opts) {
                    let prefix = util.format('[%s] [%s]', moment().format('YYYY-MM-DD hh:mm:ss').trim(), info.level.toUpperCase());
                    if (info.splat) {
                        info.message = util.format('%s %s', prefix, util.format(info.message, ...info.splat));
                    } else {
                        info.message = util.format('%s %s', prefix, info.message);
                    }
                    return info;
                })(),
                format.printf(info => `${info.message}`)
            ),
            transports: [
                new transports.File({
                    maxsize: 5120000,
                    maxFiles: 5,
                    filename: './logs/log-api.log'
                }),
                new transports.Console({
                    level: 'debug'
                })
            ]
        })
    }

    async info(msg) {
        this.winstonLogger.info(msg);
    }

    async error(msg) {
        this.winstonLogger.error(msg);
    }

}
