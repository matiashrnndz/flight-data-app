import { AirlineRepository } from '../repositories/airlinesRepository';

export class AirlineService {

    private constructor() {}

    static async getAll() {
        return await AirlineRepository.getAll();
    }

    static async getById(id: string) {
        return await AirlineRepository.getById(id);
    }

}