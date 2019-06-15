import Router from '../../../Router/src/providerApi/providerApi';

export default class RouterApi {

    router: Router;

    constructor() {
        this.router = new Router();
    }

    async process(data) {
        this.router.toRoute(data);
    }

}
