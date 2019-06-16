import { concatFieldsInto } from './concatFieldsInto';
import { dateFormatter } from './dateFormatter';
import { parseCancellationReason } from './parseCancellationReason';
import { toBoolean } from './toBoolean';

export var transformationsFactory = {
    concatFieldsInto: concatFieldsInto,
    dateFormatter: dateFormatter,
    parseCancellationReason: parseCancellationReason,
    toBoolean: toBoolean
}