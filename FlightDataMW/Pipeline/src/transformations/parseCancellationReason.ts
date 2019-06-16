import { IInputData, IInputDataConfigFilters } from '../iInputData';

/*
    * {
    *   name : parseCancellationReason
    * }
*/
export var parseCancellationReason = (input: IInputData, next) => {
    let field = 'CANCELLATION_REASON';

    if(!input.hasOwnProperty(field)) {
        next(new Error(`parseCancellationReason : ${field} does not exists for Input ID : ${input.id} `), null);
    }

    switch(input[field]) {
        case 'A':
            input[field] = 'A - Airline/Carrier';
            break;
        case 'B':
            input[field] = 'B - Weather';
            break;
        case 'C':
            input[field] = 'C - National Air System';
            break;
        case 'D':
            input[field] = 'D - Security';
            break;
        default:
            next(new Error(`parseCancellationReason : Actual value is not valid for Input ID : ${input.id} `), null);
            break;
    }
    
    input.config.transformations.shift();
    next(null, input);
}