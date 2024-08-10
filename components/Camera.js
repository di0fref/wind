import {StyleSheet, View, Text} from "react-native";
import {CameraView, useCameraPermissions} from 'expo-camera';
import {useState} from "react";
import {useNavigation} from "expo-router";
import {Button} from "./button";
import {useTranslation} from "react-i18next";
// import {useTranslation} from "react-i18next";
export default function Camera({cancelClicked, QRScanned}) {

    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();

    // const {t} = useTranslation()
    const nav = useNavigation()

    const {t} = useTranslation()
    const appStyles = StyleSheet.create({
        flexView: {
            alignContent: "center",
            justifyContent: "center",
            flex: 1,
        },
    })


    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const onBarcodeScanned = (result) => {
        QRScanned(result)
    }

    return (

        // <View style={{flex: 1, alignContent: "center", justifyContent: "space-between"}}>
        <View style={{flex: 1}}>
            <CameraView BarcodeBounds={{size: 50}} style={{flex: 1}}
                        barcodeScannerSettings={{
                            barcodeTypes: ["qr"],
                        }} onBarcodeScanned={onBarcodeScanned}>
            </CameraView>
            {/*</View>*/}
            <View className={"p-4 bg-black"}>
                {/*<Button onPress={e => {*/}
                {/*    cancelClicked();*/}
                {/*    nav.navigate("checkin")*/}
                {/*}}>*/}
                {/*    {t("CHECK IN")}*/}
                {/*</Button>*/}
                <Button className={"mb-8"} variant={"destructive"} onPress={cancelClicked}>
                    {t("Cancel")}
                </Button>
            </View>
        </View>
    )
}
