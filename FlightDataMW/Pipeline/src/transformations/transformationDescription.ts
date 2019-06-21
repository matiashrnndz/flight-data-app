import { concatFieldsIntoDescription } from './concatFieldsInto';
import { dateFormatterDescription } from './dateFormatter';
import { parseCancellationReasonDescription } from './parseCancellationReason';
import { toBooleanDescription } from './toBoolean';

export var transformationsDescriptions = () : string => {
    let transformationsDescriptions =
    ` 
--------- Start of Transformations available ---------

${concatFieldsIntoDescription},
${dateFormatterDescription},
${parseCancellationReasonDescription},
${toBooleanDescription}
    `
    return transformationsDescriptions;
};