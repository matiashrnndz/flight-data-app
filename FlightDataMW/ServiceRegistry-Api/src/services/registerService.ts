const RegisterRepository = require('../repositories/repository')('Register');

export class RegisterService {

    registerRepository: any;

    constructor() {
        this.registerRepository = new RegisterRepository();
    }

    async register(IATA_CODE, SERVICE_ID, data) {
        data.options.airline = IATA_CODE;
        data.options.idClient = SERVICE_ID;
        return await this.registerRepository.register(data);
    }

    async delete(SERVICE_ID) {
        return await this.registerRepository.delete(SERVICE_ID);
    }

    async discover() {
        return await this.registerRepository.discover();
    }

}
