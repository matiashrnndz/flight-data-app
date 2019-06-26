import { IInputData } from '../iInputData';

export var filterFieldGreaterThanDescription = 
`{
    name: filterFieldGreaterThan,
    field: nameOfField,
    params : [
        numberThatTheFieldHasToBeGreaterThan
    ]
}`

export var filterFieldGreaterThan = (input: IInputData, next) => {
    let field = input.config.filters[0].field;
    let number = input.config.filters[0].params[0];

    if(!input.hasOwnProperty(field)) {
        next(new Error(`filterFieldGreaterThan : ${field} does not exists for Input ID : ${input.id} `), null);
    }

    // field not a number

    // number not a number
    
    if(parseInt(input[field]) <= number) {
        next(new Error(`filterFieldGreaterThan : ${field} is not greater than ${number} for Input ID : ${input.id} `), null);
    } 

    input.config.filters.shift();
    next(null, input);

}
