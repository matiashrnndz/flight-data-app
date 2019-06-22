import AbstractPipeline from './abstract-pipeline';
import ForwardToDeliver from '../router/forwardToDeliver';

class DirectPipeline extends AbstractPipeline {

    run(input) {

        let pendingFilters = this.filters.slice();
        let pendingTransformations = this.transformations.slice();
        let pendingOutputFields = this.outputFields.slice();
        let errorDetected = false;

        process.nextTick(() => {
            loopFilters(null, input);
        });

        let loopFilters = (err, result) => {
            if (!errorDetected) {
                if (err) {
                    errorDetected = true;
                    return this.emit('error', err);
                }
                if (pendingFilters.length === 0) {
                    return loopTransformations(null, result);
                }
                process.nextTick(() => {
                    let filter = pendingFilters.shift();
                    filter.call(this, result, loopFilters);
                });
            }
        };

        let loopTransformations = (err, result) => {
            if(!errorDetected) {
                if (err) {
                    errorDetected = true;
                    return this.emit('error', err);
                }
                if (pendingTransformations.length === 0) {
                    return loopOutputFields(null, result);
                }
                process.nextTick(() => {
                    let transformation = pendingTransformations.shift();  
                    transformation.call(this, result, loopTransformations);
                });
            }
        };

        let loopOutputFields = (err, result) => {
            if (!errorDetected) {
                if (err) {
                    errorDetected = true;
                    return this.emit('error', err);
                }
                if (pendingOutputFields.length === 0) {
                    return deliverResult(null, result);
                }
                process.nextTick(() => {
                    let outputField = pendingOutputFields.shift();  
                    outputField.call(this, result, loopOutputFields);
                });
            }
        };

        let deliverResult = (err, result) => {
            if (!errorDetected) {
                if (err) {
                    errorDetected = true;
                    return this.emit('error', err);
                }
                ForwardToDeliver.forward(result);
                return this.emit('end', result);
            }
        }
    }
}

module.exports = DirectPipeline;