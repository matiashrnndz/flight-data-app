import * as moment from 'moment';

/*
    * {
    *   name : dateFormatter
    *   params : {
    *       format : format
    *   }
    * }
*/
export var dateFormatter = (input, next) => {
    let format = input.config.transformations[0].format;
    if (input.YEAR && input.MONTH && input.DAY) {
        try {
            let currentFormat = moment(input.YEAR+'-'+input.MONTH+'-'+input.DAY, 'YYYY-MM-DD');
            input.DATE = currentFormat.format(format);
            input.config.transformations.shift();
            next(null, input);
        } catch (err) {
            console.log('Date formatter catch error');
        }
    } else {
        next(null, input);
    }
}