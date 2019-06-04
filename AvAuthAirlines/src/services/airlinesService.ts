import AirlineRepository from '../repositories/airlinesRepository';

export default class AirlineService {

    private airlineRepository : AirlineRepository;

    constructor() {
        this.airlineRepository = new AirlineRepository();
    }

    async getAll() {
        return await this.airlineRepository.getAll();
    }

    async getById(id : string) {
        return await this.airlineRepository.getById(id);
    }

}