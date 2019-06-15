import Setup from '../setup/setup';
const Queue = require('bull');

export default class Consumer {

    setup : Setup;
    queue: any;

    constructor() {
        this.setup = new Setup();

        this.queue = new Queue('flights-to-process');

        this.queue.on('drained', (job) => {
            console.log(`All requests have been processed`);
        });

        this.queue.on('completed', (job, result) => {
            console.log(`Job completed with result ${result}`);
            job.remove();
        });
    }

    async consume() {
        this.queue.process(async (job, done) => {
            this.setup.setup(job.data);
            done();
        });
    }


}