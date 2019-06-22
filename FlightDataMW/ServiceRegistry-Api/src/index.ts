import { initServer } from './server';

(async () => {
    try {
        await initServer();
    } catch(err) {
        console.log(`Error initializing server: ${err}`);
        process.exit(1);
    }
})();
