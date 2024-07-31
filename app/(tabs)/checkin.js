import CheckInOutForm from "../../components/CheckInOutForm";
import {useCallback, useEffect, useState} from "react";
import {api} from "../../lib/http-common";
import i18next from "i18next";
import i18n from "../../lib/i81n";
import {useFocusEffect, useIsFocused} from "@react-navigation/native";
import {Text} from "react-native";


export default function Checkin() {

    const [list, setList] = useState()
    const isFoused = useIsFocused()
    i18next.on('languageChanged', (e) => {
        get()
    })

    const get = async () => {
        api.get("/api/list/checkin").then((res) => {
            setList(res.data)
        })
    }

    useEffect(() => {
        isFoused && get()
        console.log(JSON.stringify("Checkin", null, 2))
    }, [isFoused]);


    if (list) {
        return <CheckInOutForm key={Math.random()}
                               useLangField={{
                                   text: i18n.language === "en" ? "text_en" : "text",
                                   help: i18n.language === "en" ? "help_en" : "help",
                               }}
                               setCheckedIn={true}
                               action={"checkin"}
                               title={"Check-In"}
                               data={list}
                               link={"checkindone"}
        />
    }
}
