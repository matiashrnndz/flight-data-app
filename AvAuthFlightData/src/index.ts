import { initServer } from './server';
import { Repository } from './repositories/repository';
import { FlightController } from './controllers/flightController';
import { initDataLoader } from './data_loader/loadData';

(async () => {
    try {
        await Repository.initRepository();
        await initServer();
        await initDataLoader();
        setTimeout(() => FlightController.sendFlights(), 10000);
    } catch(err) {
        console.log(`Error initializing server: ${err}`);
        process.exit(1);
    }
})();
