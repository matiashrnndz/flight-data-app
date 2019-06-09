import { Repository } from './repository'

export class AirlineRepository {

    private constructor() { }

    static async getAll() {
        var query = Repository.Airline.find();
        let airlines = await query;
        return airlines.map((airline) => airline.toObject());
    }

    static async save(data) {
        let airline = await Repository.Airline.create(data);
        return airline.toObject();
    }
    
}
