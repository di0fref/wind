import {Alert, Image, Linking, View, Text, TouchableOpacity} from "react-native";
import MainView from "../../components/MainView";
import {Button} from "@/components/button";
import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import {api} from "../../lib/http-common";
import {defaultText} from "../../assets/styles/default";
import Camera from "../../components/Camera";
import {useCameraPermissions} from "expo-camera";
import {Link, useNavigation} from "expo-router";
import {useFonts} from "expo-font";
import {useTranslation} from "react-i18next";
import * as NAV from "expo-router/build/global-state/routing";


export default function HomeScreen() {

    const {user, role, isSignedIn, me} = useAuth()
    const [showCamera, setShowCamera] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();

    const nav = useNavigation()
    const {t} = useTranslation()
    // const theme = useTheme()

    const cancelClicked = (e) => {
        setShowCamera(false)
    }

    // const [loaded] = useFonts({
    //     SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    // });

    useEffect(() => {
        console.log(JSON.stringify("Home", null, 2))
    }, []);

    // useEffect(() => {
    //     console.log("Stage change: ", user.stage)
    // }, [user.stage]);

    const QRScanned = (result) => {
        try {
            api.post('/api/qrscanned', {house_id: 1})
                .then((res) => {
                    me()
                    nav.navigate("checkin")
                }).catch((error) => {
                console.log(JSON.stringify(error.response, null, 2));
            })
        } catch (err) {
            console.log("Error 2: ", err)
        }
        setShowCamera(false)
    }

    const cancelAndReset = () => {
        api.put('/api/housesession/' + user?.house_session?.id, {
            status: "inactive"
        }).then(res => {
            console.log(JSON.stringify(res.body, null, 2))

            me()

            console.log(JSON.stringify(user, null, 2))

            // nav.navigate("index")
        }).catch((error) => {
            console.log(JSON.stringify(error.message, null, 2))
        })
    }

    if (showCamera) {
        if (!permission?.granted && permission?.status === "denied") {

            Alert.alert('Camera permission', 'You have previously denied this app to use the camera. You need to manually grant permission by opening settings and allow the this app to use the camera.', [
                {
                    text: 'Cancel',
                    onPress: () => setShowCamera(false),
                    style: 'cancel',
                },
                {
                    text: 'Open settings', onPress: () => {
                        setShowCamera(false)
                        Linking.openSettings()
                    }
                },
            ]);

        } else if (!permission?.granted) {
            requestPermission()
        } else {
            return (
                <Camera QRScanned={QRScanned} cancelClicked={cancelClicked}/>
            )
        }
    }


    if (role === "Guest") {
        if (user.stage === "checked_in") {
            return (

                <MainView>
                    <View className={"absolute items-center m-auto left-1/2 right-1/2 top-16 bottom-0"}>
                        <Image style={{opacity: 0.6}} source={require('../../assets/images/icon.png')}/>
                    </View>
                    <View className={"flex-1 justify-center"}>
                        <View>
                            <Text className={`${defaultText} font-black text-2xl mb-2 text-center`}>{t("Start check-out")}</Text>
                            <Text className={`${defaultText} text-center`}>Are you ready to check out?</Text>
                            <Text className={`${defaultText} leading-6 text-center mt-4 mb-12`}>{t("Click the button below to start the check out process. This will guide you through the process of documenting your check out.")}</Text>
                        </View>
                        <View>
                            <Button className={"mb-4"} variant={"info"} onPress={() => nav.navigate("checkout")}>
                                {t("Start Check Out")}
                            </Button>
                        </View>
                    </View>
                </MainView>

            )
        } else if (user.stage === undefined || user.stage === "checked_out") {
            return (
                <MainView>
                    <View className={"absolute items-center m-auto left-1/2 right-1/2 top-16 bottom-0"}>
                        <Image style={{opacity: 0.6}} source={require('../../assets/images/icon.png')}/>
                    </View>
                    <View className={"flex-1 justify-center"}>

                        <View>
                            <Text className={`${defaultText} font-black text-2xl mb-2 text-center`}>{t("Start check-in")}</Text>
                            <Text className={`${defaultText} text-center`}>Are you ready to check in?</Text>
                            <Text className={`${defaultText} leading-6 text-center mt-4 mb-12`}>{t("Open the camera by clicking the button below. Point the camera at the QR code on the inside of the front door.")}</Text>
                        </View>
                        <Button variant={"info"} onPress={QRScanned}>Scan</Button>

                        <View>
                            <Button className={"mb-4"} variant={"info"} onPress={() => setShowCamera(true)}>
                                {t("Open Camera")}
                            </Button>
                        </View>
                    </View>
                </MainView>
            )
        } else {
            return (
                <MainView>
                    <View className={"absolute items-center m-auto left-1/2 right-1/2 top-16 bottom-0"}>
                        <Image style={{opacity: 0.6}} source={require('../../assets/images/icon.png')}/>
                    </View>
                    <View>
                        <Text className={`${defaultText}`}>You are registered on:</Text>
                        <Text className={`${defaultText}`}>{
                            user?.house_session?.house?.address_street
                        }</Text>
                        <Text className={`${defaultText}`}>{
                            user?.house_session?.house?.address_postalcode + ", " + user?.house_session?.house?.address_city
                        }</Text>
                    </View>
                    <View className={"flex-1 justify-center"}>
                        <Text className={`${defaultText} font-black text-2xl text-center mb-2`}>Hello</Text>
                        <Text className={`${defaultText} text-center mb-6`}>Please click on the button below to start the check in process.</Text>

                        <View className={"flex justify-between flex-r"}>
                            <Button variant={"info"} onPress={() => nav.navigate("checkin")}>Start Check-In</Button>
                            <Button className={"mt-6"} variant={"destructive"} onPress={() => {
                                cancelAndReset()
                            }}>Cancel and rescan QR code</Button>
                        </View>
                    </View>
                </MainView>
            )
        }
    }

    if (role === "Service") {
        return (
            <MainView>
                <View className={"absolute items-center m-auto left-1/2 right-1/2 top-1 bottom-0"}>
                    <Image style={{opacity: 0.6}} source={require('../../assets/images/icon.png')}/>
                </View>
                <View className={"flex-1 justify-center"}>
                    <Text className={`${defaultText} text-center mb-2 font-black text-2xl`}>{t("Welcome_name", {name: user.name})}</Text>
                    <Text className={`${defaultText} text-center`}>{t("Your service tickets can be found in the My Tickets tab below")}</Text>
                    <View className={"mt-4"}>
                        <Link href={"tickets"}>
                            <Text className={"font-bold text-center text-blue-800"}>{t("My Tickets")}</Text>
                        </Link>
                    </View>
                </View>

            </MainView>
        )
    }
}
