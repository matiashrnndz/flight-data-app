import axios from 'axios';
import * as convert from 'xml-js';

export class FlightController {

    constructor() { }

    async deliver(url: string, flight) {
        console.log(flight);

        axios.post(url, flight)
        .then((res) => { })
        .catch((error) => {
            console.error(error);
        });

    }

}
