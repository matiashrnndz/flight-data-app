import axios from 'axios';

export class RegisterController {

    async register(url: string, data) {
        return axios.post(url, data)
        .then((res) => {
            return res.data;
         })
        .catch((error) => {
            return new Error(error);
        });
    }

    async discover(url: string) {
        return axios.get(url)
        .then((res) => {
            return res.data;
         })
        .catch((error) => {
            return new Error(error);
        });
    }

}
