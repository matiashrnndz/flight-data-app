import { FlightController } from '../controller/flightController';
import { RegisterController } from '../controller/registerController';

export class RegisterService {

    registerController: RegisterController;

    constructor() {
        this.registerController = new RegisterController();
    }

    async register(url, data) {
        return await this.registerController.register(url, data);
    }

    async discover(url) {
        return await this.registerController.discover(url);
    }
}