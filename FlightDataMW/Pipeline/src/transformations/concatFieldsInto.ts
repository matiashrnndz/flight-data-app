import { IInputData, IInputDataConfigFilters } from '../iInputData';

export var concatFieldsIntoDescription = 
`{
    name: concatFieldsInto,
    field: nameOfField,
    params : [
        listOfFieldsToConcat
    ]
}`

export var concatFieldsInto = (input: IInputData, next) => {
    let field = input.config.transformations[0].field;
    let params = input.config.transformations[0].params;

    if(input.hasOwnProperty(field)) {
        next(new Error(`concatFieldsInto : ${field} already exists for Input ID : ${input.id} `), null);
    }

    if(!params) {
        input[field] = '';
        next(null, input);
    }

    let result = ' ';
    for(let i = 0; i < params.length; i++) {
        if (!input.hasOwnProperty(params[i])) {
            next(new Error(`concatFieldsInto : ${field} does not exist for Input ID : ${input.id} `), null);
        }
        if (input[params[i]] != '') {
            if(result == '') {
                result = `${params[i]} : ${input[params[i]]}`;  
            }
            result = result + `, ${params[i]} : ${input[params[i]]}`;
        }
    }
    input[field] = result;

    input.config.filters.shift();
    next(null, input);
}