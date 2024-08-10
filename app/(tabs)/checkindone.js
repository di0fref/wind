import MainView from "../../components/MainView";
import {Text, View} from "react-native";
import {Link, useNavigation} from "expo-router"
import {defaultText} from "../../assets/styles/default";
import {ThumbsUp} from "lucide-react-native";
import {useTranslation} from "react-i18next";
import {Button} from "../../components/button";


export default function Checkindone() {

    const {t} = useTranslation();
    const nav = useNavigation();
    return (
        <MainView>
            <View className={"flex-1 justify-center"}>
                <View className={"items-center mb-4"}>
                    <ThumbsUp color={"blue"} size={48}/>
                </View>
                <Text className={`${defaultText} font-black text-xl text-center`}>{t("Thank you!")}</Text>
                <Text className={`${defaultText} text-center px-6 my-8`}>{t("Your have successfully checked in and documented the current status of the cottage.")}</Text>
                {/*<Text className={`${defaultText} text-center px-6 mb-8`}>{t("This will benefit you during the check out process - and will minimize the risk of additional fees.")}</Text>*/}

                <Button variant={"success"} onPress={e => {nav.navigate("index")}}>{t("Back home")}</Button>
            </View>
        </MainView>
    )
}
