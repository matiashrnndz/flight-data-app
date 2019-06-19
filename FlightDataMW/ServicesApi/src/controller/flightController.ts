import axios from 'axios';

export class FlightController {

    constructor() { }

    async deliver(url: string, contentType: string, flight) {
        axios.post(url, flight, { headers: { 'Content-Type': contentType}})
        .then((res) => { })
        .catch((error) => {
            console.error(error);
        });
    }

}
