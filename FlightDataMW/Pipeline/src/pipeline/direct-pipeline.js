const AbstractPipeline = require('./abstract-pipeline');

class DirectPipeline extends AbstractPipeline {

    run(input) {

        let pendingFilters = this.filters.slice();
        let pendingTransformations = this.transformations.slice();
        let pendingOutputFields = this.outputFields.slice();

        let loopFilters = (err, result) => {
            if (err) {
                return this.emit('error', err);
            }
            if (pendingFilters.length === 0) {
                return loopTransformations(null, result);
            }
            let filter = pendingFilters.shift();  
            process.nextTick(() => {
                filter.call(this, result, loopFilters);
            });
        };

        let loopTransformations = (err, result) => {
            if (err) {
                return this.emit('error', err);
            }
            if (pendingTransformations.length === 0) {
                return loopOutputFields(null, result);
            }
            let transformation = pendingTransformations.shift();  
            process.nextTick(() => {
                transformation.call(this, result, loopTransformations);
            });
        };

        let loopOutputFields = (err, result) => {
            if (err) {
                return this.emit('error', err);
            }
            if (pendingOutputFields.length === 0) {
                return this.emit('end', result);
            }
            let outputField = pendingOutputFields.shift();  
            process.nextTick(() => {
                outputField.call(this, result, loopOutputFields);
            });
        };

        process.nextTick(() => {
            loopFilters(null, input);
        });
    }
}

module.exports = DirectPipeline;