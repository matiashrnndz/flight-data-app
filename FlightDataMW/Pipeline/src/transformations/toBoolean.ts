import { IInputData, IInputDataConfigTransformations } from '../iInputData';
import * as moment from 'moment';

export var toBooleanDescription = 
`{
    name: toBoolean,
    field : nameOfField
}`

export var toBoolean = (input, next) => {

    let field = input.config.transformations[0].field;
    if (!input[field]) {
        next(new Error(`toBoolean : ${field} does not exists for Input ID : ${input.id}`), null);
    }

    switch(input[field]) {
        case '0':
            input[field] = false;
            break;
        case '1':
            input[field] = true;
            break;
        default:
            next(new Error(`toBoolean : ${input[field]} is not 0 or 1 for Input ID : ${input.id}`), null);
            break;
    }

    input.config.transformations.shift();
    next(null, input);
}