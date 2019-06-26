import * as config from 'config';
import AbstractPipeline from './abstract-pipeline';

export default function getPipelineType() : typeof AbstractPipeline {

    let type = config.get('pipeline.pipe') || 'direct';

    let implementation : typeof AbstractPipeline;

    try {
        implementation = require(`./${type}-pipeline`);
    } catch (err) {
        implementation = require('./direct-pipeline');
    }
    
    return implementation;
}
