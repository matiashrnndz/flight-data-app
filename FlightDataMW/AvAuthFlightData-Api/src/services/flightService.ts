const FlightRepository = require('../repositories/repository')('flight');

export class FlightService {

    flightRepository: any;

    constructor() {
        this.flightRepository = new FlightRepository();
    }

    async save(data) {
        return await this.flightRepository.save(data);
    }

}
