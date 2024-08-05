import * as SecureStore from "expo-secure-store";
import {Axios, CanceledError} from "axios";
import axios from "axios";
import {Platform} from "react-native";
import {router} from 'expo-router';
import {getSecureData} from "./utils";



export const api = axios.create({
    // baseURL: "http://192.168.50.103:8000",
    baseURL: "http://localhost:8000",
})


api.interceptors.response.use(
    (response) => response,
    (error => {
        if (error instanceof CanceledError || error.message === 'Network Error') {
            alert("Network is unreachable.")
        }
        if (error.response.status === 401) {
            // Revoke all tokens and redirect user to login
            console.log(JSON.stringify("Token expired", null, 2))
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
        // console.log(JSON.stringify(config, null, 2))
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
