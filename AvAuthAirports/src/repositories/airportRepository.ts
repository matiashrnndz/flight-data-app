import * as csv from "csvtojson";
import Airport from "../models/airport";
import * as Config from 'config';

export class AirportRepository {

    static airports: Airport[] = [];

    private constructor() {};

    static async getAll() {
        return this.airports;
    }

    static async getById(id: string) {
        for (let item of this.airports) {
            if (item.IATA_CODE == id) {
                return item;
            }
        }
    }

    static async loadData() {
        try {
            let result = await csv().fromFile(Config.get('data.file'));
            AirportRepository.convertToModel(result);
        } catch (err) {
            console.log(`Error while loading data file: ${err}`);
        }
    }

    private static convertToModel(input) {
        input.shift();
        for (let item of input) {
            let IATA_CODE = item.IATA_CODE;
            let AIRPORT =  item.AIRPORT;
            let CITY = item.CITY;
            let STATE = item.STATE;
            let COUNTRY = item.COUNTRY;
            let LATITUDE = parseFloat(item.LATITUDE);
            let LONGITUDE = parseFloat(item.LONGITUDE);
            let airport = new Airport(IATA_CODE, AIRPORT, CITY, STATE, COUNTRY, LATITUDE, LONGITUDE);

            AirportRepository.airports.push(airport);
        }
    }

}
