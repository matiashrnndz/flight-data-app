const FlightRepository = require('./flightRepository');
import * as Queue from 'bull';

module.exports = class FlightRedisRepository extends FlightRepository {

    constructor() {
        super();
        this.queue = new Queue('new-flights');
    }

    async save(flight) {
        this.queue.add(flight);
    }

}
