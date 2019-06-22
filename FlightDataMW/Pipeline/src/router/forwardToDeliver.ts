
import * as Queue from 'bull';
import { Logger } from '../logger/loggerApi';

export default class ForwardToDeliver {

    static queue : Queue.Queue = new Queue('flights-to-deliver');

    private constructor() {}

    static async forward(data) {
        Logger.info("Sent to deliver : " + JSON.stringify(data));
        this.queue.add(data);
    }

}