import axios from 'axios';

export class FlightController {

    constructor() { }

    async deliver(url: string, contentType: string, flight) {
        console.log(flight);
        axios.post(url, flight)
        .then((res) => { })
        .catch((error) => {
            console.error(error);
        });
    }

}
