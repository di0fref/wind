import MainView from "../../components/MainView";
import {defaultText} from "../../assets/styles/default";
import {View, Text, TouchableOpacity} from "react-native";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {CircleChevronDown, CircleChevronUp} from "lucide-react-native";
import Animated from 'react-native-reanimated';
import {Button} from "../../components/button";
import {useNavigation} from "expo-router";

export default function Customerservice() {


    const [booking, showBooking] = useState(false)
    const [reception, showReception] = useState(false)
    const [service, showService] = useState(false)
    const nav = useNavigation();

    const {t} = useTranslation();
    return (
        <MainView>
            <Text className={`${defaultText} text-xl font-bold mb-2`}>{t("Vad kan vi hjälpa dig med?")}</Text>
            <Text className={`${defaultText} mb-4`}>Här hittar du kontaktuppgifter till våra olika avdelningar och ansvariga medarbetare. Om du inte hittar det eller den du söker så är det bara att mejla oss. </Text>



            <TouchableOpacity className={`${defaultText} font-bold mb-2`} onPress={() => showBooking(!booking)}>
                <View className={"flex flex-row items-center justify-between"}>
                    <Text className={`${defaultText} font-bold mb-2`}>Bokning</Text>
                    <Text>{booking ? <CircleChevronDown/> : <CircleChevronUp/>}</Text>
                </View>
            </TouchableOpacity>
            <View style={{display: booking ? "block" : "none"}}>
                <Text className={`${defaultText}`}>Telefon 0253-410 00</Text>
                <Text className={`${defaultText} mb-2`}>E-post bokning@idrefjall.se</Text>
                <Text className={`${defaultText}`}>Telefontid</Text>
                <Text className={`${defaultText}`}>Måndag - Fredag 10.00 - 15.00</Text>
                <Text className={`${defaultText} mb-4`}>Lördag - Söndag 11.00 - 14.00</Text>
            </View>





            <TouchableOpacity className={`${defaultText} font-bold mb-2`} onPress={() => showReception(!reception)}>
                <View className={"flex flex-row items-center justify-between"}>
                    <Text className={`${defaultText} font-bold mb-1`}>Reception</Text>
                    <Text>{reception ? <CircleChevronDown/> : <CircleChevronUp/>}</Text>
                </View>
            </TouchableOpacity>
            <View style={{display: reception ? "block" : "none"}}>
                <Text className={`${defaultText}`}>Telefon 0253-412 53</Text>
                <Text className={`${defaultText} mb-4`}>E-post reception@idrefjall.se</Text>
            </View>




            <TouchableOpacity className={`${defaultText} font-bold mb-2`} onPress={() => showService(!service)}>
                <View className={"flex flex-row items-center justify-between"}>
                    <Text className={`${defaultText} font-bold mb-2`}>Service & Butiker</Text>
                    <Text>{service ? <CircleChevronDown/> : <CircleChevronUp/>}</Text>
                </View>
            </TouchableOpacity>
            <View style={{display: service ? "block" : "none"}}>
                <Text className={`${defaultText} mb-2`}>Telefon 0253-413 14</Text>
                <Text className={`${defaultText}`}>Telefontid</Text>
                <Text className={`${defaultText}`}>Måndag - Söndag 07.00 - 21.00</Text>
            </View>

            {/*<Button className={"my-4"} variant={"success"}>*/}
            {/*    <Text className={"text-white font-bold"}>Skapa ärende</Text>*/}
            {/*</Button>*/}


        </MainView>
    )
}
