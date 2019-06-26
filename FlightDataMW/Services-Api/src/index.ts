import { FlightController } from './controller/flightController';
import { FlightService } from './services/flightService';
const FlightRepository = require('./repositories/repository')('flight');

this.flightController = new FlightController();
this.flightService = new FlightService(this.flightController);
this.flightRepository = new FlightRepository(this.flightService);
this.flightRepository.getAll();
