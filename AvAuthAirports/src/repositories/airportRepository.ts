import * as csv from "csvtojson";
import Airport from "../models/airport";
import config = require('config');

export default class AirportRepository {

    airports: Airport[];

    constructor() {
        this.airports = [];
        load(this.airports);
    };

    async getAll() {
        return this.airports;
    }

    async getById(id : string) {
        for (let item of this.airports) {
            if (item.IATA_CODE == id) {
                return item;
            }
        }
    }

}

async function load(output) {
    try {
        let result = await csv().fromFile(config.get('data.file'));
        convertToModel(result, output);
    } catch (err) {
        console.log(`Error while loading data file: ${err}`);
    }
}

function convertToModel(input, output) {
    input.shift();
    for (let item of input) {
        console.log(item);
        let IATA_CODE = item.IATA_CODE;
        let AIRPORT =  item.AIRPORT;
        let CITY = item.CITY;
        let STATE = item.STATE;
        let COUNTRY = item.COUNTRY;
        let LATITUDE = parseFloat(item.LATITUDE);
        let LONGITUDE = parseFloat(item.LONGITUDE);
        let airport = new Airport(IATA_CODE, AIRPORT, CITY, STATE, COUNTRY, LATITUDE, LONGITUDE);
        output.push(airport);
    }
}
