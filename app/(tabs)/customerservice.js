import MainView from "../../components/MainView";
import {defaultText} from "../../assets/styles/default";
import {View, Text, TouchableOpacity} from "react-native";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {CircleChevronDown, CircleChevronUp} from "lucide-react-native";
import Animated from 'react-native-reanimated';
import {Button} from "../../components/button";
import {useNavigation} from "expo-router";
import {api} from "../../lib/http-common";
import {useIsFocused} from "@react-navigation/native";

export default function Customerservice() {


    const [booking, showBooking] = useState(true)
    const [reception, showReception] = useState(true)
    const [service, showService] = useState(true)
    const nav = useNavigation();
    const isFocused = useIsFocused();


    const [data, setData] = useState([]);
    const {t} = useTranslation();

const refresh = () => {
    api.get("api/customerservicedata").then((response) => {
        console.log(JSON.stringify("Fetching: customerservicedata", null, 2))
        setData(response.data)
    })
}

    useEffect(() => {
        isFocused && refresh()
    }, [isFocused]);


    return (
        <MainView>
            <Text className={`${defaultText} text-2xl font-bold mb-2`}>{data?.title}</Text>
            <Text className={`${defaultText} mb-4`}>{data?.ingress} </Text>
            {data && data.sections?.map((item, index) => (
                <View key={index} className={`mb-4`}>
                    <Text className={`${defaultText} font-bold mb-1`}>{item.name}</Text>
                    <Text className={`${defaultText}`}>{item.description}</Text>
                </View>
            ))}
            {/*<Button onPress={refresh} variant={"info"}>*/}
            {/*    Refresh*/}
            {/*</Button>*/}
        </MainView>
    )
}
