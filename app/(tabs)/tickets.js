import {Pressable, RefreshControl, ScrollView, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import MainView from "../../components/MainView";
import {t, time} from "../../lib/utils";
import tw from "twrnc"
import {useCallback, useEffect, useState} from "react";
import {defaultText} from "../../assets/styles/default";
import {useIsFocused} from '@react-navigation/native';
import {api} from "../../lib/http-common";
import {MaterialIcons} from '@expo/vector-icons';
import dayjs from "dayjs";
import {useNavigation} from "expo-router";
import Chip from "../../components/Chip";
import axios from "axios";
import Overlay from "../../components/Overlay";
import {apiGet} from "../../lib/api";
import {Button} from "../../components/button";
import {CirclePlus} from "lucide-react-native";
import {useAuth} from "../../contexts/AuthContext";

export default function Tickets() {
    const [refreshing, setRefreshing] = useState(false);
    const [tickets, setTickets] = useState([])
    const isFocused = useIsFocused();
    const source = axios.CancelToken.source();
    const [showOverlay, setShowOverlay] = useState(false)

    const {logout} = useAuth()
    const nav = useNavigation()

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        api.get(`/api/tickets`).then((response) => {
            setTickets(response.data)
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                logout().then(res => {
                    nav.navigate("login")
                })
            }
            console.log(JSON.stringify(error.response.status, null, 2))
            console.log(error)
        }).finally(() => {
            setRefreshing(false);
        })
    }, []);


    useEffect(() => {
        console.log(JSON.stringify("Tickets", null, 2))
        isFocused && onRefresh()
    }, [isFocused]);

    if (tickets.length > 0) {
        return (
            <View className={"h-full flex-1 bg-neutral-100"}>
                <MainView onRefresh={onRefresh} bg={"#eee"}>
                    <NewTickerButton/>
                    {tickets.map(ticket => <Ticket key={ticket.id} data={ticket}/>)}
                    {/*<Overlay show={showOverlay} text={t("Updating...")}/>*/}
                </MainView>
            </View>
        )
    } else {
        return (
            <MainView onRefresh={onRefresh}>
                <View className={"flex-1 justify-center h-full"}>
                    <Text className={`${defaultText} text-center font-bold mb-4`}>{t("No tickets to show.")}</Text>
                    <Text className={`${defaultText} text-center`}>{t("Drag down to update.")}</Text>
                </View>
            </MainView>
        )
    }
}

function NewTickerButton() {

    const nav = useNavigation()
    return (
        // <Button style={{width: 140}} variant={"info"}>New ticket</Button>
        <View className={"flex items-end mb-2"}>
            <Button variant={"info"} className={"w-44 flex flex-row justify-center items-center"} onPress={() => nav.navigate("newticket")}>
                {/*<View className={"flex flex-row justify-end items-center"}>*/}
                <CirclePlus color={"white"}/>
                <Text className={"text-white"}>New Ticket</Text>
                {/*</View>*/}
            </Button>
        </View>
    )
}

export function Ticket({data}) {
    const nav = useNavigation()

    return (

        <TouchableOpacity className={"bg-white mb-2 shadow-sm rounded-md"} onPress={() => nav.navigate("modalticket", {ticketId: data.id})}>
            <View className={"flex flex-row items-start"}>
                <View className={"p-2"}>
                    <MaterialIcons name="support-agent" size={32} style={tw`text-neutral-400`}/>
                </View>
                <View className={"p-2 flex-1"}>
                    <Text className={`font-bold mb-1`}>{data.description}</Text>
                    <Text className={` text-neutral-600 text-sm mb-2`}>{data?.house?.address_street}</Text>
                    <Text className={``}>{data.action}</Text>

                    <View className={"flex flex-row items-center justify-between mt-4"}>
                        <Text className={`${defaultText}`}>Deadline: {time(data.deadline_at)}</Text>
                        <Chip text={data.status}/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

