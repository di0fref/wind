import CheckInOutForm from "../../components/CheckInOutForm";
import {useEffect, useState} from "react";
import api from "../../lib/http-common";
import i18next from "i18next";
import i18n from "../../lib/i81n";
import {Text} from "react-native";


export default function Checkout() {

    const [list, setList] = useState()

    i18next.on('languageChanged', (e) => {
        get()
    })

    const get = async () => {
        api.get("/api/list/checkout").then((res) => {
            console.log(JSON.stringify("get", null, 2))
            setList(res.data)
        })
    }

    useEffect(() => {
        console.log(JSON.stringify("Checkout", null, 2))
        get()
    }, []);


    if (list) {
        return <CheckInOutForm key={Math.random()}
            useLangField={{
                text: i18n.language === "en" ? "text_en" : "text",
                help: i18n.language === "en" ? "help_en" : "help",
            }}
            setCheckedIn={false}
            action={"checkout"}
            title={"Check-Out"}
            data={list}
            link={"checkoutdone"}
        />
    } else {
        return <Text>Missing list</Text>
    }

}
