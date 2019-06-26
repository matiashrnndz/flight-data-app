import { Repository } from './repository'
import * as Config from 'config';
import * as CsvtojsonV2 from 'csvtojson';

export class FlightRepository {

    private constructor() { }

    static async getAll(limit, offset) {
        var query = Repository.Flight.find();
        if (limit) {
            query.limit(limit);
        }
        if (offset) {
            query.skip(offset);
        }
        let flights = await query;
        return flights.map((flight) => flight.toObject());
    }

    static async save(data, airlines, airports) {
        let model = await FlightRepository.toModel(data, airlines, airports);
        let flight = await Repository.Flight.create(model);
        return flight.toObject();
    }

    static async loadFlights(airlines, airports) {
        try {
            await CsvtojsonV2().fromFile(Config.get('providers.flights-uri'))
            .subscribe((json, lineNumber) => {
                return new Promise((resolve, reject) => {
                    FlightRepository.save(json, airlines, airports);
                    resolve(json);
                })
            });
        } catch (err) {
            console.log(`Error while loading data file: ${err}`);
        }
    }

    private static async toModel(data, airlines, airports) {

        let airlineName = '';
        let originAirportName = '';
        let destinationAirportName = '';

        if (data.AIRLINE) {
            for (let i=0; i<airlines.length; i++) {
                let item = airlines[i];
                if (item.IATA_CODE == data.AIRLINE) {
                    airlineName = item.AIRLINE;
                }
            }
        }

        for (let i=0; i<airports.length; i++) {
            let item = airports[i];
            if (data.ORIGIN_AIRPORT) {
                if (item.IATA_CODE == data.ORIGIN_AIRPORT) {
                    originAirportName = item.AIRPORT;
                }
            } 
            if (data.DESTINATION_AIRPORT) {
                if (item.IATA_CODE == data.DESTINATION_AIRPORT) {
                    destinationAirportName = item.AIRPORT;
                }
            }
        }

        let flight = {
            YEAR: data.YEAR,
            MONTH: data.MONTH,
            DAY: data.DAY,
            DAY_OF_WEEK: data.DAY_OF_WEEK,
            FLIGHT_NUMBER: data.FLIGHT_NUMBER,
            TAIL_NUMBER: data.TAIL_NUMBER,
            SCHEDULED_DEPARTURE: data.SCHEDULED_DEPARTURE,
            DEPARTURE_TIME: data.DEPARTURE_TIME,
            DEPARTURE_DELAY: data.DEPARTURE_DELAY,
            TAXI_OUT: data.TAXI_OUT,
            WHEELS_OFF: data.WHEELS_OFF,
            SCHEDULED_TIME: data.SCHEDULED_TIME,
            ELAPSED_TIME: data.ELAPSED_TIME,
            AIR_TIME: data.AIR_TIME,
            DISTANCE: data.DISTANCE,
            WHEELS_ON: data.WHEELS_ON,
            TAXI_IN: data.TAXI_IN,
            SCHEDULED_ARRIVAL: data.SCHEDULED_ARRIVAL,
            ARRIVAL_DELAY: data.ARRIVAL_DELAY,
            DIVERTED: data.DIVERTED,
            CANCELLED: data.CANCELLED,
            CANCELLATION_REASON: data.CANCELLATION_REASON,
            AIR_SYSTEM_DELAY: data.AIR_SYSTEM_DELAY,
            SECURITY_DELAY: data.SECURITY_DELAY,
            AIRLINE_DELAY: data.AIRLINE_DELAY,
            LATE_AIRCRAFT_DELAY: data.LATE_AIRCRAFT_DELAY,
            WEATHER_DELAY: data.WEATHER_DELAY,
            AIRLINE: data.AIRLINE,
            AIRLINE_NAME: airlineName,
            ORIGIN_AIRPORT: data.ORIGIN_AIRPORT,
            ORIGIN_AIRPORT_NAME: originAirportName,
            DESTINATION_AIRPORT: data.DESTINATION_AIRPORT,
            DESTINATION_AIRPORT_NAME: destinationAirportName
        };
        
        return flight;
    }

}
