import * as SecureStore from "expo-secure-store";
import {Platform} from "react-native";
import dayjs from "dayjs";

export function time(data) {
    if(!data) return  null
    return dayjs(data).format(getDateformat(data))
}


export function getDateformat(date) {
    const _default = "DD MMMM YYYY, HH:mm"
    const _same_year = "DD MMMM, HH:mm"

    if (dayjs(date).format("YYYY") === dayjs().format("YYYY")) {
        return _same_year;
    }
    return _default
}

export const setSecureData = async (key, val) => {
    if (Platform.OS === "web") {
        localStorage.setItem(key, JSON.stringify(val))
    } else {
        await SecureStore.setItemAsync(key, JSON.stringify(val));
    }
}

export const removeSecureData = async (key) => {
    if (Platform.OS === "web") {
        localStorage.removeItem(key)
    } else {
        await SecureStore.deleteItemAsync(key);
    }
}

export const getSecureData = async (key) => {

    let result
    if (Platform.OS === "web") {
        result = localStorage.getItem(key)
    } else {
        result = await SecureStore.getItemAsync(key);
    }
    if (result) {
        return JSON.parse(result)
    }
    return null

}

export const showTransition = (setShowOverlay, time) => {
    setShowOverlay(true)
    return new Promise(resolve => setTimeout(() => resolve(setShowOverlay(false)), time??1000))
}

export function t(data) {
    return data
}

export function capitalize(string){
    return  string && string.charAt(0).toUpperCase() + string.slice(1);
}
