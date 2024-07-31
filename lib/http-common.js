import * as SecureStore from "expo-secure-store";
import {Axios} from "axios";
import axios from "axios";
import {Platform} from "react-native";
import {router} from 'expo-router';
import {getSecureData} from "./utils";

const getToken = () => {
    if (Platform.OS === "web") {
        return JSON.parse(localStorage.getItem("token"))
    } else {
        let result = SecureStore.getItem("token");
        return JSON.parse(result);
    }
}

let api = axios.create({
    baseURL: "http://192.168.50.103:8000",
    params: {}
})
// const sleep = (ms) => {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// };
// api.interceptors.response.use(async (response) => {
//     await sleep(3000)
//     return response;
// }, function (error) {
//     // Do something with response error
//     console.error(error)
//     return Promise.reject(error);
// })

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

export default api
