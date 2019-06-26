import { AirportRepository } from '../repositories/airportRepository';

export class AirportService {

    private constructor() {}

    static async getAll() {
        return await AirportRepository.getAll();
    }

    static async getById(id: string) {
        return await AirportRepository.getById(id);
    }

}