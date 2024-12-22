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

export default function Customerservice() {


    const [booking, showBooking] = useState(true)
    const [reception, showReception] = useState(true)
    const [service, showService] = useState(true)
    const nav = useNavigation();


    const [data, setData] = useState([]);
    const {t} = useTranslation();

const refresh = () => {
    api.get("api/customerservicedata").then((response) => {
        console.log(JSON.stringify(response.data, null, 2))
        setData(response.data)
    })
}

    useEffect(() => {

    }, []);


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

            <Button onPress={refresh} variant={"info"}>
                Refresh
            </Button>

            {/*<TouchableOpacity className={`${defaultText} font-bold mb-2`} onPress={() => showBooking(!booking)}>*/}
            {/*    <View className={"flex flex-row items-center justify-between"}>*/}
            {/*        <Text className={`${defaultText} font-bold mb-2`}>Bokning</Text>*/}
            {/*        <Text>{booking ? <CircleChevronDown/> : <CircleChevronUp/>}</Text>*/}
            {/*    </View>*/}
            {/*</TouchableOpacity>*/}
            {/*<View style={{display: booking ? "block" : "none"}}>*/}
            {/*    <Text className={`${defaultText}`}>Telefon 0253-410 00</Text>*/}
            {/*    <Text className={`${defaultText} mb-2`}>E-post bokning@idrefjall.se</Text>*/}
            {/*    <Text className={`${defaultText}`}>Telefontid</Text>*/}
            {/*    <Text className={`${defaultText}`}>Måndag - Fredag 10.00 - 15.00</Text>*/}
            {/*    <Text className={`${defaultText} mb-4`}>Lördag - Söndag 11.00 - 14.00</Text>*/}
            {/*</View>*/}





            {/*<TouchableOpacity className={`${defaultText} font-bold mb-2`} onPress={() => showReception(!reception)}>*/}
            {/*    <View className={"flex flex-row items-center justify-between"}>*/}
            {/*        <Text className={`${defaultText} font-bold mb-1`}>Reception</Text>*/}
            {/*        <Text>{reception ? <CircleChevronDown/> : <CircleChevronUp/>}</Text>*/}
            {/*    </View>*/}
            {/*</TouchableOpacity>*/}
            {/*<View style={{display: reception ? "block" : "none"}}>*/}
            {/*    <Text className={`${defaultText}`}>Telefon 0253-412 53</Text>*/}
            {/*    <Text className={`${defaultText} mb-4`}>E-post reception@idrefjall.se</Text>*/}
            {/*</View>*/}




            {/*<TouchableOpacity className={`${defaultText} font-bold mb-2`} onPress={() => showService(!service)}>*/}
            {/*    <View className={"flex flex-row items-center justify-between"}>*/}
            {/*        <Text className={`${defaultText} font-bold mb-2`}>Service & Butiker</Text>*/}
            {/*        <Text>{service ? <CircleChevronDown/> : <CircleChevronUp/>}</Text>*/}
            {/*    </View>*/}
            {/*</TouchableOpacity>*/}
            {/*<View style={{display: service ? "block" : "none"}}>*/}
            {/*    <Text className={`${defaultText} mb-2`}>Telefon 0253-413 14</Text>*/}
            {/*    <Text className={`${defaultText}`}>Telefontid</Text>*/}
            {/*    <Text className={`${defaultText}`}>Måndag - Söndag 07.00 - 21.00</Text>*/}
            {/*</View>*/}

            {/*<Button className={"my-4"} variant={"success"}>*/}
            {/*    <Text className={"text-white font-bold"}>Skapa ärende</Text>*/}
            {/*</Button>*/}


        </MainView>
    )
}
