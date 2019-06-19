var config = require('config');

function deferBinding() {

    let type = config.get('pipeline.pipe') || 'direct';
    let implementation;

    try {
        implementation = require(`./${type}-pipeline`);
    } catch (err) {
        implementation = require('./direct-pipelineTS');
    }
    
    return implementation;
}

module.exports = deferBinding();