import { AirportRepository } from '../repositories/airportRepository';

export class AirportService {

    private constructor() { }

    static async getAll() {
        return await AirportRepository.getAll();
    }

    static async save(airport) {
        return await AirportRepository.save(airport);
    }

}
