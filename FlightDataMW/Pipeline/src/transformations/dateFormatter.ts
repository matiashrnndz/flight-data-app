import { IInputData, IInputDataConfigTransformations } from '../iInputData';
import * as moment from 'moment';

/*
    * {
    *   name : dateFormatter
    *   params : [
    *       '{format (see momentjs library)}',
    *       '{new field name}'
    *   ]
    * }
*/
export var dateFormatter = (input, next) => {
    let format = input.config.transformations[0].params[0];
    let newField = input.config.transformations[0].params[1];

    if (!(input.YEAR && input.MONTH && input.DAY)) {
        next(new Error(`dateFormatter : YEAR, MONTH or DAY not valid for Input ID : ${input.id}`), null);
    }

    try {
        let currentFormat = moment(input.YEAR+'-'+input.MONTH+'-'+input.DAY, 'YYYY-MM-DD');
        input[newField] = currentFormat.format(format);
        input.config.transformations.shift();
        next(null, input);
    } catch (err) {
        next(new Error(`dateFormatter : ${format} not valid for Input ID : ${input.id}`), null);
    }
}