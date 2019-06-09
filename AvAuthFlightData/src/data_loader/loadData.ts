import { FlightRepository } from '../repositories/flightRepository';
import { AirlineController } from '../controllers/airlineController';
import { AirportController } from '../controllers/airportController';
import { AirlineService } from '../services/airlineService';
import { AirportService } from '../services/airportService';

export function initDataLoader() {

    (async () => {
        await AirlineController.getAirlines();
        await AirportController.getAirports();

        setTimeout(() => {
            AirportService.getAll().then(
                function onFulfilled(airportsValue) {
                    AirlineService.getAll().then(
                        function onFullFilled(airlinesValue) {
                            setTimeout(() => {
                                FlightRepository.loadFlights(airlinesValue, airportsValue).then(
                                    function onFullFilled(value) {
                                        console.log("Finished loading flights.");
                                    })}, 5000);
                        }
                    );
                }
            );
        }, 2000);
    })();

}
