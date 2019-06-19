import { FlightController } from './controller/flightController';
import { FlightService } from './services/flightService';
const FlightRepository = require('./repositories/repository')('flight');

this.flightController = new FlightController();
this.flightService = new FlightService(this.flightController);
this.flightRepository = new FlightRepository(this.flightService);
this.flightRepository.getAll();
/*
import { initServer } from './server';

(async () => {
    try {
        await initServer();
    } catch(err) {
        console.log(`Error initializing server: ${err}`);
        process.exit(1);
    }
})();
*/
