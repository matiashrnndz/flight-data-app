
import * as Queue from 'bull';

export default class ForwardToDeliver {

    static queue : Queue.Queue = new Queue('flights-to-deliver');

    private constructor() { }

    static async forward(data) {
        this.queue.add(data);
    }

}