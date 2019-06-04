import AirportRepository from '../repositories/airportRepository';

export default class AirportService {

    private airportRepository : AirportRepository;

    constructor() {
        this.airportRepository = new AirportRepository();
    }

    async getAll() {
        return await this.airportRepository.getAll();
    }

    async getById(id : string) {
        return await this.airportRepository.getById(id);
    }

}