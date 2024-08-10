import {useEffect, useState} from "react";
import {Alert, Text, TextInput, View} from "react-native";
import {api} from "../lib/http-common";
import {useLocalSearchParams, useNavigation} from "expo-router";

import {defaultText} from "../assets/styles/default";
import dayjs from "dayjs";
import {time, showTransition} from "../lib/utils";
import MainView from "../components/MainView";
import Chip from "../components/Chip";
import {Button} from "../components/button";
import Overlay from "../components/Overlay";
import {useTranslation} from "react-i18next";
import {TextArea} from "../components/text-area";
import {Select} from "../components/select";
import i18next from "i18next";
import MapScreen from "../components/MapScreen";

const selectStatusValues = [
    {
        key: "new",
        value: "new",
        label: i18next.t("New"),
    },
    {
        key: "assigned",
        value: "assigned",
        label: i18next.t("Assigned"),
    },
    {
        key: "started",
        value: "started",
        label: i18next.t("Started"),
    },
    {
        key: "pending_third_party",
        value: "pending_third_party",
        label: i18next.t("Pending third party"),
    },
    {
        key: "closed",
        value: "closed",
        label: i18next.t("Closed"),
    },
]

export default function Modalticket() {
    const [data, setData] = useState([])
    const {ticketId} = useLocalSearchParams()
    const [showOverlay, setShowOverlay] = useState(false)
    const [overLayText, setOverLayText] = useState("")
    const [isEditing, setIsEditing] = useState(false)

    // Form fields
    const [status, setStatus] = useState(data.status)
    const [address, setAddress] = useState("")
    const [action, setAction] = useState("")
    const [description, setDescription] = useState("")

    const {form, setForm} = useState({
        status: "",
        action: "",
        description: "",
    })

    const {t} = useTranslation()
    const nav = useNavigation()

    useEffect(() => {
        console.log(JSON.stringify("Modalticket", null, 2))
        getTicket()
    }, [ticketId]);


    // const [status, setStatus] = useState({})
    // const [status, setStatus] = useState({})

    const getTicket = () => {
        api.get("/api/ticket/" + ticketId).then(res => {
            setData(res.data) // The whole ticket

            setStatus(res.data.status)
            setAddress(res.data.address)
            setAction(res.data.action)
            setDescription(res.data.description)

        }).catch(err => {
        })
    }

    const markOpenClicked = () => {
        setOverLayText(t("Opening ticket..."))
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
        setOverLayText(t("Closing ticket.."))
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

    const save = () => {
        setIsEditing(false)

        let data = {
            status:status,
            action:action,
            description: description,
        }

        api.put("api/ticket/" + ticketId, data).then(res => {
            console.log(JSON.stringify(res.data, null, 2))
            getTicket()
        }).catch(err => {

        })
    }

    return (
        <MainView>

            <View className={"divide-y divide-gray-200"}>
                <Text className={`${defaultText} text-lg p-2 font-bold`}>{data.description} {isEditing ? 1 : 0}</Text>

                <View className={`flex flex-row`}>
                    <View>
                        <Text className={`${defaultText} p-2 w-24 font-bold _bg-green-300`}>{t("Number")}</Text>
                    </View>
                    <View className={`flex-shrink p-3_ _bg-blue-300`}>
                        <Text className={`${defaultText} p-2 w-full _bg-blue-100`}>{data.id}</Text>
                    </View>
                </View>

                <View className={`flex flex-row`}>
                    <View>
                        <Text className={`${defaultText} p-2 w-24 font-bold `}>{t("Status")}</Text>
                    </View>
                    <View className={`flex-shrink justify-center items-center`}>


                        {!isEditing ? (
                            <Chip text={data.status}/>
                        ) : (
                            <Select value={status} onValueChange={setStatus} items={selectStatusValues}/>
                        )}

                    </View>
                </View>

                <View className={`flex flex-row`}>
                    <View>
                        <Text className={`${defaultText} p-2 w-24 font-bold _bg-green-300`}>{t("Address")}</Text>

                    </View>
                    <View className={`flex-shrink justify-center items-center`}>
                        <Text className={`${defaultText} p-2 w-full _bg-blue-100`}>{data?.house?.address_street}</Text>
                    </View>
                </View>

                <View className={`flex flex-row`}>
                    <View>
                        <Text className={`${defaultText} p-2 w-24 font-bold `}>{t("Action")}</Text>
                    </View>
                    <View className={`flex-shrink justify-center items-center`}>


                        {!isEditing ? (
                            <Text className={`${defaultText} p-2 w-full`}>{data.action}</Text>
                        ) : (
                            <TextInput
                                className={` border rounded p-2  border-gray-300 bg-gray-50 w-44`}

                                value={action}
                                onChangeText={setAction}
                            />
                        )}


                    </View>
                </View>

                <View className={`flex flex-row`}>
                    <View>
                        <Text className={`${defaultText} p-2 w-24 font-bold _bg-green-300`}>{t("Deadline")}</Text>
                    </View>
                    <View className={`flex-shrink justify-center items-center`}>
                        <Text className={`${defaultText} p-2 w-full _bg-blue-100`}>
                            {time(data.deadline_at)}
                        </Text>
                    </View>
                </View>

                <View className={`flex flex-row`}>
                    <View>
                        <Text className={`${defaultText} p-2 w-24 font-bold _bg-green-300`}>{t("Created")}</Text>
                    </View>
                    <View className={`flex-shrink justify-center items-center`}>
                        <Text className={`${defaultText} p-2 w-full _bg-blue-100`}>{time(data.created_at)}</Text>
                    </View>
                </View>
            </View>

            <View>

                <Button variant={"info"} className={"mt-8 mb-4"} onPress={() => {
                    isEditing?save(): setIsEditing(true)
                }}>
                    {isEditing?t("Save"):t("Edit")}
                </Button>

                {isEditing &&
                <Button className={"mt-4 mb-4"} variant={"destructive"} onPress={() => {setIsEditing(false)}}>
                    {t("Cancel")}
                </Button>
                }

                <MapScreen house_id={data.house_id} />


                {/*{data.status === "closed" ? (*/}
                {/*    <Button variant={"info"} className={"mt-8"} onPress={markOpenClicked}>*/}
                {/*        {t("Re-open ticket")}*/}
                {/*    </Button>*/}
                {/*) : (*/}
                {/*    <Button variant={"success"} className={"mt-8"} onPress={markCompletedClicked}>*/}
                {/*        {t("Mark as completed")}*/}
                {/*    </Button>*/}
                {/*)}*/}
            < /View>
            <Overlay show={showOverlay} text={t(overLayText)}/>
        </MainView>
    )
}
