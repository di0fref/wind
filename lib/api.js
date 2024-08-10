import wretch from "wretch";
import i18next from "i18next";
import * as SecureStore from "expo-secure-store";


const externalApi = wretch("http://192.168.50.103:8000")
    .headers({
        "Content-Type": "application/json; charset=UTF-8",
        "Accept": "application/json",
    })

export const apiGet = async (url) => {
    return externalApi
        .url(url)
        .auth(`Bearer ${JSON.parse(SecureStore.getItem("token"))}`)
        .get()
        .unauthorized(error => {
            console.log("Unauthorized")
        })
        .json(json => json)
        .catch(error => {
            alert(error)
        })
}

export const apiPost = async (url, data) => {

    return externalApi
        .url(url)
        .auth(`Bearer ${JSON.parse(SecureStore.getItem("token"))}`)
        .post(data)
        .unauthorized(error => {
            console.log("Unauthorized")
        })
        .error(422, error => {
            alert(i18next.t("These credentials do not match our records"))
        })
        .json(response => {
            return response
        })
        .catch(error => {
            alert(error)
        })

}

