import {View, Text} from "react-native";
import {useEffect} from "react";
import {defaultText} from "../../assets/styles/default";
import {useTranslation} from "react-i18next";
import MainView from "../../components/MainView";

export default function Manual() {

    const {t} = useTranslation();
    useEffect(() => {

    }, []);

    return (
        <MainView>
            {/*<Text className={`${defaultText}`}>Address: </Text>*/}
            <Text className={`${defaultText}`}>{t("User manuals for various features of the cottage can be found here once you are checked in.")}</Text>

            <Text className={`${defaultText} text-xl font-bold mb-1 mt-4`}>Sauna</Text>
            <Text className={`${defaultText}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</Text>
            <Text className={`${defaultText} text-xl font-bold mb-1 mt-4`}>Pool</Text>
            <Text className={`${defaultText}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</Text>
            <Text className={`${defaultText} text-xl font-bold mb-1 mt-4`}>Etc.</Text>
            <Text className={`${defaultText}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</Text>
        </MainView>
    )
}
