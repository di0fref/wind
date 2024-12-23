import {Axios, CanceledError} from "axios";
import axios from "axios";
import {getSecureData} from "./utils";

export const api = axios.create({
    // baseURL: "http://192.168.50.103:8000",
    timeout: 3000,
    baseURL: "http://localhost:8000",
    // baseURL: "http://206.168.213.128",
})

api.interceptors.response.use(
    (response) => response,
    (error => {
        console.log(JSON.stringify(error, null, 2))
        if (error instanceof CanceledError || error.message === 'Network Error') {
            alert("Network is unreachable.")
        }
        else if (error.response.status === 401) {
            // Revoke all tokens and redirect user to login
            console.log(JSON.stringify("Token expired", null, 2))
        }
       else if(error.response.code === "ECONNABORTED"){
            console.log(JSON.stringify("ECONNABORTED", null, 2))
       }
        return Promise.reject(error);
    }));

api.interceptors.request.use(
    async config => {
        const token = await getSecureData("token")

        if (token) {
            config.headers['Authorization'] = "Bearer " + token
        }
        config.headers["Access-Control-Allow-Origin"] = "*";
        config.headers["Content-Type"] = "application/json; charset=utf-8";
        config.headers["Accept"] = "application/json"
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

