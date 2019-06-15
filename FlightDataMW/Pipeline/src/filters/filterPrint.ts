/*
    * {
    *   name : filterPrint
    *   params : {
    *   }
    * }
*/
export var filterPrint = (input, next) => {
    console.log(`Result from filter is ${JSON.stringify(input)}`);
    next(null, input);
};