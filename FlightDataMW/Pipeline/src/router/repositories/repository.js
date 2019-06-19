var Config = require('config');

function deferBinding(repositoryName) {
    let type = Config.get('repository.type') || 'redis';
    let implementation = require(`./${repositoryName}${capitalize(type)}Repository`);
    return implementation;
}

function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = deferBinding;