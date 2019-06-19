import AbstractPipeline from './abstract-pipeline';
import ForwardToDeliver from '../router/forwardToDeliver';

class DirectPipeline extends AbstractPipeline {

    run(input) {

        let pendingFilters = this.filters.slice();
        let pendingTransformations = this.transformations.slice();
        let pendingOutputFields = this.outputFields.slice();
        let errorDetected = false;

        process.nextTick(() => {
            //console.log("nextTick");
            loopFilters(null, input);
        });

        let loopFilters = (err, result) => {
            //console.log("loopFilters");
            if (!errorDetected) {
                if (err) {
                    //console.log("loopFilters : error");
                    errorDetected = true;
                    return this.emit('error', err);
                }
                if (pendingFilters.length === 0) {
                    //console.log("loopFilters : lenght = 0");
                    return loopTransformations(null, result);
                }
                process.nextTick(() => {
                    //console.log("loopFilters : nextTick");
                    let filter = pendingFilters.shift();
                    filter.call(this, result, loopFilters);
                });
            }
        };

        let loopTransformations = (err, result) => {
            //console.log("loopTransformations");
            if(!errorDetected) {
                if (err) {
                    //console.log("loopTransformations : error");
                    errorDetected = true;
                    return this.emit('error', err);
                }
                if (pendingTransformations.length === 0) {
                    //console.log("loopTransformations : lenght = 0");
                    return loopOutputFields(null, result);
                }
                process.nextTick(() => {
                    //console.log("loopTransformations : nextTick");
                    let transformation = pendingTransformations.shift();  
                    transformation.call(this, result, loopTransformations);
                });
            }
        };

        let loopOutputFields = (err, result) => {
            //console.log("loopOutputFields");
            if (!errorDetected) {
                if (err) {
                    errorDetected = true;
                    return this.emit('error', err);
                }
                if (pendingOutputFields.length === 0) {
                    //console.log("loopOutputFields : lenght = 0");
                    return deliverResult(null, result);
                }
                process.nextTick(() => {
                    //console.log("loopOutputFields : nextTick");
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