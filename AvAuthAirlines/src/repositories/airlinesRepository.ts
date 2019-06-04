import * as csv from "csvtojson";
import Airline from "../models/airline";
import config = require('config');

export default class AirlineRepository {

    airlines: Airline[];

    constructor() {
        this.airlines = [];
        load(this.airlines);
    };

    async getAll() {
        return this.airlines;
    }

    async getById(id : string) {
        for (let item of this.airlines) {
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
        let airline = new Airline(item.IATA_CODE, item.AIRLINE);
        output.push(airline);
    }
}
