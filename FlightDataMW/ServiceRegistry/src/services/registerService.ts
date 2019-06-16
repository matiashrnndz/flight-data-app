const RegisterRepository = require('../repositories/repository')('Register');

export class RegisterService {

    registerRepository: any;

    constructor() {
        this.registerRepository = new RegisterRepository();
    }

    async register(data) {
        let uid = 'airline-' + generateUUID();
        data.options.idClient = uid;
        return await this.registerRepository.register(data);
    }

    async delete(id) {
        return await this.registerRepository.delete(id);
    }

}

function generateUUID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
