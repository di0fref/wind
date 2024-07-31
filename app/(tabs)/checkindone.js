import MainView from "../../components/MainView";
import {Text, View} from "react-native";
import {Link} from "expo-router"
import {t} from "i18next";
import {defaultText} from "../../assets/styles/default";
import {ThumbsUp} from "lucide-react-native";


export default function Checkindone() {
    return (
        <MainView>
            <View className={"flex-1 justify-center"}>
                <View className={"items-center mb-4"}>
                    <ThumbsUp color={"blue"} size={48}/>
                </View>
                <Text className={`${defaultText} font-black text-xl text-center`}>{t("Thank you!")}</Text>
                <Text className={`${defaultText} text-center px-6 my-4`}>{t("Your have successfully checked in and documented the current status of the cottage")}</Text>
                <Text className={`${defaultText} text-center px-6 mb-8`}>{t("This will benefit you during the check out process - and will minimize the risk of additional fees.")}</Text>
                {/*<Text>*/}
                {/*    <Link className={"text-xl text-blue-800"} href={"index"}>Back home</Link>*/}
                {/*</Text>*/}
            </View>
        </MainView>
    )
}
