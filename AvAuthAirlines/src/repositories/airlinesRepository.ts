import * as csv from "csvtojson";
import Airline from "../models/airline";
import * as Config from 'config';

export class AirlineRepository {

    static airlines: Airline[] = [];

    private constructor() {};

    static async getAll() {
        return this.airlines;
    }

    static async getById(id: string) {
        for (let item of this.airlines) {
            if (item.IATA_CODE == id) {
                return item;
            }
        }
    }

    static async loadData() {
        try {
            let result = await csv().fromFile(Config.get('data.file'));
            AirlineRepository.convertToModel(result);
        } catch (err) {
            console.log(`Error while loading data file: ${err}`);
        }
    }

    private static convertToModel(input) {
        input.shift();
        for (let item of input) {
            let airline = new Airline(item.IATA_CODE, item.AIRLINE);
            
            AirlineRepository.airlines.push(airline);
        }
    }

}


