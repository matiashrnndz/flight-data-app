function deferBinding(loggerName) {
    let type = loggerName || 'winston';
    let implementation = require(`./${capitalize(type)}Logger`);
    return implementation;
}

function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = deferBinding;