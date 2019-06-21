import axios from 'axios';

export class RegisterController {

    async register(url: string, data) {
        axios.post(url, data)
        .then((res) => { })
        .catch((error) => {
            console.error(error);
        });
    }

    async discover(url: string) {
        axios.get(url)
        .then((res) => { })
        .catch((error) => {
            console.error(error);
        });
    }

}
