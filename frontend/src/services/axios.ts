import axios, { AxiosInstance} from "axios";
//import Cookies from "js-cookie";

const axiosConfig: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        //'Authorization': 'Bearer ' + Cookies.get("token")
    }
});

export { axiosConfig };