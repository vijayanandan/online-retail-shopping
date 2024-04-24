import Axios from 'axios';
export default function (context,inject) {
    Axios.defaults.baseURL = context.env.apiBase;
    // Axios.defaults.headers.common.Accept = 'application/json';
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