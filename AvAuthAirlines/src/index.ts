import { initServer } from "./server";
import { AirlineRepository } from './repositories/airlinesRepository';

(async () => {
    try {
        await initServer();
        await AirlineRepository.loadData();
    } catch(err) {
        console.log(`Error initializing server: ${err}`);
        process.exit(1);
    }
})();