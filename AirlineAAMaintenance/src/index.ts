import { initServer } from './server';
import { RegisterService } from './services/registerService';
import * as Config from 'config';

let registerService = new RegisterService();

(async () => {
    try {
        await initServer();

        // UNCOMMENT TO EXCECUTE REGISTER SERVICE
        //console.log(await registerService.register(Config.get('url-to-register'), registerData()));

        // UNCOMMENT TO DISCOVER
        //console.log(await registerService.discover(Config.get('url-to-discover')));

        // UNCOMMENT TO DELETE THE SERVICE
        //console.log(await registerService.delete(Config.get('url-to-delete')));

    } catch(err) {
        console.log(`Error initializing server: ${err}`);
        process.exit(1);
    }
})();

function registerData() {
    let config = {
        options: {
            ip: "localhost",
            port: 8070,
            protocol: "json"
        },
        filters: [
            {
                type: "filterFieldValueOne",
                field: "CANCELLED"
            },
            {
                type: "filterFieldNotEmpty",
                field: "CANCELLATION_REASON"
            }
        ],
        transformations: [
            {
                type: "dateFormatter",
                params: ["DD-MM-YYYY", "DATE"]
            },
            {
                type: "toBoolean",
                field: "CANCELLED"
            },
            {
                type: "parseCancellationReason"
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
            "CANCELLED",
            "CANCELLATION_REASON"
        ]	
    };

    return config;
}