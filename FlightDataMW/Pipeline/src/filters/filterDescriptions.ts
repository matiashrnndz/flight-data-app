import { filterFieldGreaterThanDescription } from './filterFieldGreaterThan';
import { filterFieldNotEmptyDescription } from './filterFieldNotEmpty';
import { filterFieldValueOneDescription } from './filterFieldValueOne';

export var filterDescriptions = () : string => {
    let filterDescriptions =
    ` 
--------- Start of Filters available ---------

${filterFieldGreaterThanDescription},
${filterFieldNotEmptyDescription},
${filterFieldValueOneDescription}
    `
    return filterDescriptions;
};