import * as Queue from 'bull';

export default class Producer {
    
    queue: Queue.Queue;

    constructor() {
        this.queue = new Queue('flights-to-process');
    }

    async publish(data) {
        console.log('produced : '+JSON.stringify(data));
        this.queue.add(data);
    }

}
