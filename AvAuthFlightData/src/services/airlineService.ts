import { AirlineRepository } from '../repositories/airlineRepository';

export class AirlineService {

    private constructor() { }

    static async getAll() {
        return await AirlineRepository.getAll();
    }

    static async save(airline) {
        return await AirlineRepository.save(airline);
    }

}
