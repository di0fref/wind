import {Platform, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Link, useNavigation} from "expo-router";
import LanguageSelector from "@/components/LanguageSelector";
import {useTranslation} from "react-i18next";
import MainView from "../components/MainView";
import {useAuth} from "../contexts/AuthContext";
import {Button} from "../components/button";
import {defaultText} from "../assets/styles/default";
import {useState} from "react";
import Overlay from "../components/Overlay";

export default function SettingModal() {

    const nav = useNavigation()

    const {logout, isSignedIn} = useAuth()
    const {t} = useTranslation()
    const [showOverlay, setShowOverlay] = useState(false)

    const logOutClickedHandler = () => {
        setShowOverlay(true)
        logout(setShowOverlay).then(() => {
            setShowOverlay(false)
            // nav.navigate("login")
        })

    }

    return (
        <MainView>
            <View style={{flex: 1, alignContent: "center", justifyContent: "space-between"}}>
                <View>

                    <Text style={{textAlign: "center", fontWeight: "bold", marginBottom: 20}}>{t("Settings")}</Text>

                    {/*<View style={{marginBottom:20,display: "flex", flexDirection: "row", justifyContent: "space-between"}}>*/}
                    {/*    <Text variant={"bodyMedium"}>{t("Dark Mode")}</Text>*/}
                    {/*    <ThemeToggle/>*/}
                    {/*</View>*/}

                    <View>
                        <Text style={{marginBottom: 30}}>{t("Choose language")}</Text>
                        <LanguageSelector/>
                    </View>

                    <View>

                        {isSignedIn &&
                            <TouchableOpacity variant={"warning"} onPress={logOutClickedHandler}>
                                <Text className={`${defaultText} text-center mt-4 text-blue-800 font-bold text-lg`}>{t("Log out")}</Text>
                            </TouchableOpacity>
                        }

                        {/*{isSignedIn && <Button onPress={() => {*/}
                        {/*    logout()*/}
                        {/*    router.goBack()*/}
                        {/*}} icon={"cog"}>Log out</Button>*/}
                        {/*}*/}

                    </View>
                </View>
                <View style={{marginBottom: 40}}>
                    <Button variant={"info"} onPress={() => nav.goBack()}>
                        {t("Close")}
                    </Button>
                </View>
            </View>
            <Overlay show={showOverlay} text={t("Logging out...")}/>

        </MainView>
    );
}