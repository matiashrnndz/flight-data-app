const FlightRepository = require('./router/repositories/repository')('flight');
this.flightRepository = new FlightRepository();
this.flightRepository.getAll();