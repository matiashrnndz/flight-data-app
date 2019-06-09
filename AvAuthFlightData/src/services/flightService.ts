import { FlightRepository } from '../repositories/flightRepository';

export class FlightService {

    private constructor() { }

    static async getAll(limit, offset) {
        return await FlightRepository.getAll(limit, offset);
    }

}
