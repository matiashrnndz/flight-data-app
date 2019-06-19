import { IInputData, IInputDataConfigFilters } from '../iInputData';

/*
    * {
    *   name : filterFieldNotEmpty
    *   field : nameOfField
    * }
*/
export var filterFieldNotEmpty = (input: IInputData, next) => {
    let field = input.config.filters[0].field;

    if(!input.hasOwnProperty(field)) {
        next(new Error(`filterFieldNotEmpty : ${field} does not exists for Input ID : ${input.id} `), null);
    }

    if (input[field] == '') {
        next(new Error(`filterFieldNotEmpty : ${field} empty for Input ID : ${input.id} `), null);
    }

    input.config.filters.shift();
    next(null, input);
}