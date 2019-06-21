import { IInputData, IInputDataConfigFilters } from '../iInputData';

export var filterFieldValueOneDescription = 
`{
    name: filterFieldValueOne,
    field: nameOfField
}`

export var filterFieldValueOne = (input: IInputData, next) => {
    let field = input.config.filters[0].field;

    if(!input.hasOwnProperty(field)) {
        next(new Error(`filterFieldValueOne : ${field} does not exists for Input ID : ${input.id} `), null);
    }

    if (input[field] != '1') {
        next(new Error(`filterFieldValueOne : ${field} Not value 1 for Input ID : ${input.id} `), null);
    }
    
    input.config.filters.shift();
    next(null, input);
}