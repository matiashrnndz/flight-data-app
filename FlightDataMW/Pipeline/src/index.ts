import { filterDescriptions } from './filters/filterDescriptions';
import { transformationsDescriptions } from './transformations/transformationDescription';
import { outputFieldsDescriptions } from './output-fields/outputFieldsDescriptions';
let registerFormat = 
    ` 
--------- Start of configuration to register a service ---------

{
    "options": {
        "airline": IATACODEofYourAirline,
        "ip": ipToSendFlights,
        "port": portToSendFlights,
        "protocol": json or xml
    },
    "filters": [
        insert filters as described below.
    ],
    "transformations": [
        insert transformations as described below.
    ],
    "outputFields": [
        inser outputFields as described below.
    ]
}
    `
const FlightRepository = require('./router/repositories/repository')('flight');
this.flightRepository = new FlightRepository();
this.flightRepository.getAll();
this.flightRepository.setDescriptions(registerFormat, filterDescriptions(), transformationsDescriptions(), outputFieldsDescriptions());
