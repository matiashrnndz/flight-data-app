const FlightRepository = require('./repositories/repository')('flight');

this.flightRepository = new FlightRepository();
this.flightRepository.getAll();