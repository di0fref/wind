import {api} from "./http-common";

export const getTickets = async () => {
    let tickets = await api.get("/api/tickets")
    return tickets.data
}

export const getList = async (type) => {
    let list = await api.get("/api/list/" + type)
    return list.data
}


export const apiGet = async (url) => {
    const response = await api.get(url)
    return response
}
export const post = () => {
}
export const put = () => {
}
