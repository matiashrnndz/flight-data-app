import { initServer } from "./server";
import { AirportRepository } from './repositories/airportRepository';

(async () => {
    try {
        await initServer();
        await AirportRepository.loadData();
    } catch(err) {
        console.log(`Error initializing server: ${err}`);
        process.exit(1);
    }
})();