import * as _ from 'underscore';

export var outputFields = (input, next) => {
    let outputs = input.config.outputFields;
    delete input.config.filters;
    delete input.config.transformations;
    delete input.config.outputFields;
    for(const prop in input) {
        if(input.hasOwnProperty(prop)) {
            if (prop != 'config') {
                if (!(_.contains(outputs, prop))) {
                    delete input[prop];
                }
            }
        }
    }

    next(null, input);
}