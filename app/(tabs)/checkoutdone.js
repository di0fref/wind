import MainView from "../../components/MainView";
import {Alert, Text, View} from "react-native";
import {Link, useNavigation} from "expo-router"
import {t} from "i18next";
import {defaultText} from "../../assets/styles/default";
import {ThumbsUp} from "lucide-react-native";
import {Rating} from "../../components/Rating";
import {Button} from "../../components/button";
import {useState} from "react";
import {api} from "../../lib/http-common";
import {useAuth} from "../../contexts/AuthContext";


export default function Checkoutdone() {
    const [rating, setRating] = useState(0);
    const {user} = useAuth()
    const nav = useNavigation()
    const submit = () => {
        // Send to backend
        api.put("/api/housesession/" + user.house_session.id, {rating: rating}
        ).then(res => {

            Alert.alert(t("Thank you!"), t("For rating us. Hope to to see you again soon"),
                [
                    {
                        text: t('Close'), onPress: () => {
                            nav.navigate("index")
                        }
                    }
                ]
            )
        })

    }
    return (
        <MainView>
            <View className={"flex-1 justify-center items-center"}>
                <View className={"items-center mb-4"}>
                    <ThumbsUp color={"blue"} size={48}/>
                </View>
                <Text className={`${defaultText} font-black text-xl `}>{t("Thank you!")}</Text>
                <Text className={`${defaultText} px-6 mt-4 mb-6 text-center`}>{t("You have successfully checked out and documented the status of the cottage.")}</Text>

                <Text className={`${defaultText} mb-4 text-center `}>{t("Please take your time to rate your stay wih us.")}</Text>
                <Rating customLabel={() => {<Text>{t("Tap to rate!")}</Text>}} setRating={setRating}/>
                <Button onPress={submit} className={"mt-8 "} variant={"info"}>{t("Submit")}</Button>
            </View>
        </MainView>
    )
}
