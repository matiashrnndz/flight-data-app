import * as EventEmitter from 'events';

export default class AbstractPipeline extends EventEmitter {

    filters: ((input, next) => void) [];
    transformations: ((input, next) => void) [];
    outputFields: ((input, next) => void) [];
    
    constructor() {
        super();
        this.filters = [];
        this.transformations = [];
        this.outputFields = [];
    }

    useOutputFields(outputFields) {
        this.outputFields.push(outputFields);
    }

    useTransformation(transformation) {
        this.transformations.push(transformation);
        return this;
    }
    
    useFilter(filter) {
        this.filters.push(filter);
        return this;
    }

    run(input) {
        throw new Error('Not implemented');
    }
}
