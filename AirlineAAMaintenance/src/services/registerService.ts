import { FlightController } from '../controller/flightController';
import { RegisterController } from '../controller/registerController';

export class RegisterService {

    registerController: RegisterController;

    constructor() {
        this.registerController = new RegisterController();
    }

    async register(url, data) {
        this.registerController.register(url, data);
    }
}