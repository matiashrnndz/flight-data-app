import Producer from './producer/producer'
let producer = new Producer();

const FlightRepository = require('./repositories/repository')('flight');
this.flightRepository = new FlightRepository();
this.flightRepository.setProducer(producer);

this.flightRepository.getAll();