/*
    * {
    *   name : filterFieldNotEmpty
    *   params : {
    *       field : nameOfField
    *   }
    * }
*/
export var filterFieldNotEmpty = (input, next) => {
    let field = input.config.filters[0].field;
    for(const prop in input) {
        if(input.hasOwnProperty(prop)) {
            if(prop == field) {
                if (input[prop] != '') {
                    input.config.filters.shift();
                    next(null, input);
                }
            }
        }
    }
}