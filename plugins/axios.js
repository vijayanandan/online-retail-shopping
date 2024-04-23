import Axios from 'axios';
export default function (context,inject) {
    Axios.defaults.baseURL = process.env.API_URL;
    Axios.defaults.headers.common.Accept = 'application/json';

    Axios.interceptors.response.use(
        (response) => {
          return  response
        },
        (error) => {
            return Promise.reject(error);
        },
    );
    inject('ws',Axios);
}