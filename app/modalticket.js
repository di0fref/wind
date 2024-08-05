import {useEffect, useState} from "react";
import {Alert, Text, View} from "react-native";
import {api} from "../lib/http-common";
import {useLocalSearchParams, useNavigation} from "expo-router";

import {defaultText} from "../assets/styles/default";
import dayjs from "dayjs";
import {time, t, showTransition} from "../lib/utils";
import MainView from "../components/MainView";
import Chip from "../components/Chip";
import {Button} from "../components/button";
import Overlay from "../components/Overlay";

export default function Modalticket() {
    const [data, setData] = useState([])
    const {ticketId} = useLocalSearchParams()
    const [showOverlay, setShowOverlay] = useState(false)
    const [overLayText, setOverLayText] = useState("")
    const nav = useNavigation()
    useEffect(() => {
        console.log(JSON.stringify("Modalticket", null, 2))
        getTicket()
    }, [ticketId]);


    const getTicket = () => {
        api.get("/api/ticket/" + ticketId).then(res => {
            setData(res.data)
        }).catch(err => {})
    }

    const markOpenClicked = () => {
        setOverLayText("Opening ticket...")
        showTransition(setShowOverlay, 1000).then(() => {
            // nav.goBack()
            api.put("/api/ticket/" + ticketId, {
                status: "new",
                closed_at: new Date().toLocaleString("sv")
            }).then(() => {
                getTicket()
            })
        })

    }

    const markCompletedClicked = () => {
        setOverLayText("Closing ticket..")
        showTransition(setShowOverlay, 1000).then(() => {
            // nav.goBack()
            api.put("/api/ticket/" + ticketId, {
                status: "closed",
                closed_at: new Date().toLocaleString("sv")
            }).then(() => {
                getTicket()
            })
        })
        // Alert.alert(t("Confirm closing"), t("Would you like to close this ticket?"), [
        //     {
        //         text: t("No"),
        //         onPress: () => null,
        //         style: 'cancel',
        //     },
        //     {
        //         text: t("Yes"), onPress: () => {
        //             showTransition(setShowOverlay, 3000).then(() => {
        //                 // nav.goBack()
        //             })
        //         }
        //     }
        // ])
        //

    }


    return (
        <MainView>

            <View className={"divide-y divide-gray-200"}>
                <Text className={`${defaultText} text-lg p-2 font-bold`}>{data.description}</Text>

                <View className={`flex flex-row`}>
                    <View>
                        <Text className={`${defaultText} p-2 w-24 font-bold _bg-green-300`}>{t("Number")}</Text>
                    </View>
                    <View className={`flex-shrink p-3_ _bg-blue-300`}>
                        <Text className={`${defaultText} p-2 w-full _bg-blue-100`}>#{data.id}</Text>
                    </View>
                </View>

                <View className={`flex flex-row`}>
                    <View>
                        <Text className={`${defaultText} p-2 w-24 font-bold _bg-green-300`}>{t("Status")}</Text>
                    </View>
                    <View className={`flex-shrink p-3_ _bg-blue-300 justify-center items-center`}>
                        <Chip text={data.status}/>
                    </View>
                </View>

                <View className={`flex flex-row`}>
                    <View>
                        <Text className={`${defaultText} p-2 w-24 font-bold _bg-green-300`}>{t("Address")}</Text>
                    </View>
                    <View className={`flex-shrink p-3_ _bg-blue-300`}>
                        <Text className={`${defaultText} p-2 w-full _bg-blue-100`}>{data?.house?.address_street}</Text>
                    </View>
                </View>

                <View className={`flex flex-row`}>
                    <View>
                        <Text className={`${defaultText} p-2 w-24 font-bold _bg-green-300`}>{t("Action")}</Text>
                    </View>
                    <View className={`flex-shrink p-3_ _bg-blue-300`}>
                        <Text className={`${defaultText} p-2 w-full _bg-blue-100`}>{data.action}</Text>
                    </View>
                </View>

                <View className={`flex flex-row`}>
                    <View>
                        <Text className={`${defaultText} p-2 w-24 font-bold _bg-green-300`}>{t("Deadline")}</Text>
                    </View>
                    <View className={`flex-shrink p-3_ _bg-blue-300 justify-center items-center`}>
                        <Text className={`${defaultText} p-2 w-full _bg-blue-100`}>
                            {time(data.deadline_at)}
                        </Text>
                    </View>
                </View>

                <View className={`flex flex-row`}>
                    <View>
                        <Text className={`${defaultText} p-2 w-24 font-bold _bg-green-300`}>{t("Created")}</Text>
                    </View>
                    <View className={`flex-shrink p-3_ _bg-blue-300`}>
                        <Text className={`${defaultText} p-2 w-full _bg-blue-100`}>{time(data.created_at)}</Text>
                    </View>
                </View>
            </View>

            <View>
                {data.status === "closed" ? (
                    <Button variant={"info"} className={"mt-8"} onPress={markOpenClicked}>
                        {t("Re-open ticket")}
                    </Button>
                ) : (
                    <Button variant={"success"} className={"mt-8"} onPress={markCompletedClicked}>
                        {t("Mark as completed")}
                    </Button>
                )}
            < /View>
            <Overlay show={showOverlay} text={t(overLayText)}/>
        </MainView>
    )
}
