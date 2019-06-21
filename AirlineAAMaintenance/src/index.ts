import { initServer } from './server';
import { RegisterService } from './services/registerService';
import * as Config from 'config'

let registerService = new RegisterService();

(async () => {
    try {
        await initServer();
        registerService.register(Config.get('url-to-register'), registerData());

    } catch(err) {
        console.log(`Error initializing server: ${err}`);
        process.exit(1);
    }
})();

function registerData() {
    
}