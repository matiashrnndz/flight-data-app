import AbstractPipeline from './abstract-pipeline';
import { IInputData } from '../iInputData';

export default class DirectPipeline extends AbstractPipeline {

    pendingFilters: ((input, next) => void) [];
    pendingTransformations: ((input, next) => void) [];
    pendingOutputFields: ((input, next) => void) [];

    run(input : IInputData) {
        this.pendingFilters = this.filters.slice();
        this.pendingTransformations = this.transformations.slice();
        this.pendingOutputFields = this.outputFields.slice();

        process.nextTick(() => {
            this.loopFilters(null, input);
            //this.loopFilters.bind(this)(null, input);
        });
    }

    private loopFilters(err, result) {
        if (err) {
            return this.emit('error', err);
        }
        if (this.pendingFilters.length === 0) {
            return this.loopTransformations(null, result);
        }
        let filter = this.pendingFilters.shift();  

        process.nextTick(() => {
            filter(result, this.loopFilters);
            //filter.bind(this)(result, this.loopFilters);
            //filter.call(this, result, this.loopFilters);
        });
    };

    private loopTransformations(err, result) {
        if (err) {
            return this.emit('error', err);
        }
        if (this.pendingTransformations.length === 0) {
            return this.loopOutputFields(null, result);
        }
        let transformation = this.pendingTransformations.shift();  

        process.nextTick(() => {
            transformation(result, this.loopTransformations);
            //transformation.bind(this)(result, this.loopTransformations);
            //transformation.call(this, result, this.loopTransformations);
        });
    };

    private loopOutputFields(err, result) {
        if (err) {
            return this.emit('error', err);
        }
        if (this.pendingOutputFields.length === 0) {
            return this.emit('end', result);
        }
        let outputField = this.pendingOutputFields.shift();  

        process.nextTick(() => {
            outputField(result, this.loopOutputFields);
            //outputField.bind(this)(result, this.loopOutputFields);
            //outputField.call(this, result, this.loopOutputFields);
        });
    };
}
