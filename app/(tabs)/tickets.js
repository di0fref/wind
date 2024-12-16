import {Pressable, RefreshControl, ScrollView, Text, TouchableOpacity, View, StyleSheet, Switch} from "react-native";
import MainView from "../../components/MainView";
import {getSecureData, setSecureData, time} from "../../lib/utils";
import tw from "twrnc"
import {useCallback, useEffect, useMemo, useState} from "react";
import {defaultText} from "../../assets/styles/default";
import {useIsFocused} from '@react-navigation/native';
import {api} from "../../lib/http-common";
import {MaterialIcons} from '@expo/vector-icons';
import {useNavigation} from "expo-router";
import Chip from "../../components/Chip";
import axios from "axios";
import {Button} from "../../components/button";
import {CirclePlus} from "lucide-react-native";
import {useAuth} from "../../contexts/AuthContext";
import {useTranslation} from "react-i18next";
import { Badge, BadgeText } from "@/components/badge";

export default function Tickets() {
    const [refreshing, setRefreshing] = useState(false);
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])

    const isFocused = useIsFocused();
    const [showOverlay, setShowOverlay] = useState(false)

    const [mineOnly, setMineOnly] = useState(false)

    const {t} = useTranslation()
    const {logout, user} = useAuth()
    const nav = useNavigation()


    const setMineCheckBox = async (val) => {
        console.log(JSON.stringify(val, null, 2))
        await setSecureData("mineOnly", val)
        setMineOnly(val)
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);

        setMineOnly(await getSecureData("mineOnly"))

        try {
            api.get(`/api/tickets`, {timeout: 900}).then((response) => {
                setTickets(response.data)
            }).catch(error => {
                if (error.response && error.response.status === 401) {
                    logout().then(res => {
                        nav.navigate("login")
                    })
                }

            }).finally(() => {
                setRefreshing(false);
            })
        } catch (error) {
            console.log(JSON.stringify(error, null, 2))
        }
    }, []);



    const filtered =  useMemo(() => {
        return mineOnly?tickets?.filter(ticket => ticket.user_id === user.id):tickets
    },[mineOnly, isFocused, tickets])

    useEffect(() => {
        console.log(JSON.stringify(filtered.length, null, 2))
    }, [mineOnly]);

    useEffect(() => {
        console.log(JSON.stringify("Tickets", null, 2))

        isFocused && onRefresh()
    }, [isFocused]);

    if (filtered?.length > 0) {
        return (
            <View className={"h-full flex-1 bg-neutral-100"}>
                <MainView onRefresh={onRefresh} bg={"#eee"}>

                    {/*<OnlyMineCheckBox val={mineOnly} setVal={setMineCheckBox}/>*/}
                    <NewTickerButton/>
                    {filtered?.map(ticket => <Ticket key={ticket.id} data={ticket}/>)}
                    {/*<Overlay show={showOverlay} text={t("Updating...")}/>*/}
                </MainView>
            </View>
        )
    } else {
        return (
            <MainView onRefresh={onRefresh}>
                <View className={"flex-1 justify-center h-full"}>
                    <Text className={`${defaultText} text-center font-bold mb-4`}>{t("No tickets to show.")}</Text>
                    <Text className={`${defaultText} text-center`}>{t("Pull down to update.")}</Text>
                </View>
            </MainView>
        )
    }
}

function OnlyMineCheckBox({val, setVal}) {

    const {t} = useTranslation()

    return (
        <View className={"flex flex-row items-center justify-between mb-4"}>
            <Text className={`${defaultText}`}>{t("Show assigned to me only")}</Text>
            <Switch onValueChange={setVal} value={val}/>
        </View>
    )
}

function NewTickerButton() {

    const nav = useNavigation()
    const {t} = useTranslation()

    return (
        // <Button style={{width: 140}} variant={"info"}>New ticket</Button>
        <View className={"flex items-end mb-2"}>
            <Button variant={"info"} className={"w-44 flex flex-row justify-center items-center"} onPress={() => nav.navigate("newticket")}>
                {/*<View className={"flex flex-row justify-end items-center"}>*/}
                <CirclePlus color={"white"}/>
                <Text className={"text-white"}>{t("New Ticket")}</Text>
                {/*</View>*/}
            </Button>
        </View>
    )
}

export function Ticket({data}) {

    const nav = useNavigation()
    const {t} = useTranslation()

    return (

        <TouchableOpacity className={"bg-white mb-2 shadow-sm rounded-md"} onPress={() => nav.navigate("modalticket", {ticketId: data.id})}>
            <View className={"flex flex-row items-start"}>
                {/*<View className={"p-2"}>*/}
                {/*    <MaterialIcons name="support-agent" size={32} style={tw`text-neutral-400`}/>*/}
                {/*</View>*/}
                <View className={"p-4 flex-1"}>
                    <Text className={`${defaultText} text-lg font-bold mb-1`}>{data.description}</Text>
                    <Text className={`${defaultText} text-neutral-600 text-sm mb-2`}>{data?.house?.address_street}</Text>
                    <Text className={`${defaultText}`}>{data.action}</Text>

                    <View className={"flex flex-row items-center justify-between mt-4"}>
                        <Text className={`${defaultText} text-sm font-bold`}>{t("Deadline")}: <Text className={"font-normal text-sm"}>{time(data.deadline_at)}</Text></Text>
                        <Chip text={data.status}/>
                        {/*<TicketBadge/>*/}
                    </View>
                    <View>
                        <Text className={`${defaultText} font-bold text-sm`}>{t("Assigned to")}: <Text className={`${defaultText} font-normal text-sm`}>{data?.user?.name}</Text></Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const TicketBadge = () => {
    return <Badge variant={"warning"} text="New" />;
};
