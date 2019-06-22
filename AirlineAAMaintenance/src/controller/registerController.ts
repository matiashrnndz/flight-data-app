import axios from 'axios';
import * as Config from 'config';

export class RegisterController {

    async register(url: string, data) {
        return axios.post(url, data, { headers: { Authorization: Config.get("token") } })
        .then((res) => {
            return res.data;
         })
        .catch((error) => {
            return new Error(error);
        });
    }

    async discover(url: string) {
        return axios.get(url, { headers: { Authorization: Config.get("token") } })
        .then((res) => {
            return res.data;
         })
        .catch((error) => {
            return new Error(error);
        });
    }

    async delete(url: string) {
        return axios.post(url, {}, { headers: { Authorization: Config.get("token") } })
        .then((res) => {
            return res.data;
         })
        .catch((error) => {
            return new Error(error);
        });
    }

}
