const EventEmitter = require('events');
const Util = require('util');

class AbstractPipeline {
    
    constructor() {
        this.filters = [];
        this.transformations = [];
        this.outputFields = [];
        EventEmitter.call(this);
        Util.inherits(AbstractPipeline, EventEmitter);
    }

    useOutputFields(outputFields) {
        this.outputFields.push(outputFields);
        console.log(this.outputFields);
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

module.exports = AbstractPipeline;