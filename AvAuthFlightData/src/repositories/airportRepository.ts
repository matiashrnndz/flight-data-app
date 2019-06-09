import { Repository } from './repository'

export class AirportRepository {

    private constructor() { }

    static async getAll() {
        var query = Repository.Airport.find();
        let airports = await query;
        return airports.map((airport) => airport.toObject());
    }

    static async save(data) {
        let airport = await Repository.Airport.create(data);
        return airport.toObject();
    }
    
}
