import { initServer } from './server';
import { RegisterService } from './services/registerService';
import * as Config from 'config'

let registerService = new RegisterService();

(async () => {
    try {
        await initServer();

        // UNCOMMENT TO EXCECUTE REGISTER
        //console.log(await registerService.register(Config.get('url-to-register'), registerData()));

        // UNCOMMENT TO DISCOVER
        //console.log(await registerService.discover(Config.get('url-to-discover')));

    } catch(err) {
        console.log(`Error initializing server: ${err}`);
        process.exit(1);
    }
})();

function registerData() {
    let config = {
        options: {
            airline: "DL",
            ip: "localhost",
            port: 8072,
            protocol: "xml"
        },
        filters: [
            {
                type: "filterFieldGreaterThan",
                field: "DEPARTURE_DELAY",
                params: [-10]
            },
            {
                type: "filterFieldNotEmpty",
                field: "DEPARTURE_DELAY"
            },
            {
                type: "filterFieldNotEmpty",
                field: "DEPARTURE_TIME"
            }
        ],
        transformations: [
            {
                type: "dateFormatter",
                params: ["DD-MM-YYYY", "DATE"]
            },
            {
                type: "concatFieldsInto",
                field: "DELAY_REASON",
                params: ["AIR_SYSTEM_DELAY", "SECURITY_DELAY", "AIRLINE_DELAY", "LATE_AIRCRAFT_DELAY", "WEATHER_DELAY"]
            }
        ],
        outputFields: [
            "TIMESTAMP",
            "DATE",
            "AIRLINE",
            "FLIGHT_NUMBER",
            "ORIGIN_AIRPORT_NAME",
            "DESTINATION_AIRPORT_NAME",
            "SCHEDULED_DEPARTURE",
            "SCHEDULED_DELAY",
            "DEPARTURE_DELAY",
            "DEPARTURE_TIME",
            "SCHEDULED_ARRIVAL",
            "ARRIVAL_TIME",
            "DELAY_REASON"
        ]	
    };

    return config;
}