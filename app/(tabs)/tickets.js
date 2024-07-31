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

export default function Tickets() {
    const [refreshing, setRefreshing] = useState(false);
    const [tickets, setTickets] = useState([])
    const isFocused = useIsFocused();
    const source = axios.CancelToken.source();
    const [showOverlay, setShowOverlay] = useState(false)

    const getTickets = async () => {

        setShowOverlay(true)
        apiGet("/api/tickets").then((response) => {
            setTickets(response.data)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setShowOverlay(false)
        })
        // try {
        //     setShowOverlay(true)
        //     const res = await api.get("/api/tickets", {
        //         cancelToken: source.token,
        //     })
        //     setShowOverlay(false)
        //     setTickets(res.data)
        // } catch (error) {
        //     if (axios.isCancel(error)) {
        //         console.log('Request canceled:', error.message);
        //     } else {
        //         console.error('Error', error.message);
        //     }
        // }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getTickets()
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    }, []);


    useEffect(() => {
        console.log(JSON.stringify("Tickets", null, 2))
        isFocused && getTickets()
    }, [isFocused]);

    // useEffect(() => {
    //     getTickets()
    // }, []);

    return (


        // <View className={"flex h-full items-center justify-center p-4"}>
        <ScrollView className={"p-2 bg-[#eee]"}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }>
            {tickets.map(ticket => <Ticket key={ticket.id} data={ticket}/>)}
            <Overlay show={showOverlay} text={t("Updating...")}/>

        </ScrollView>

        // </View>

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
                    <Text className={` text-neutral-600 text-sm mb-2`}>{data.house.address_street}</Text>
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

