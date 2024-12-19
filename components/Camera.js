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
    const [hasScanned, setHasScanned] = useState(false);

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
        setHasScanned(true)
        QRScanned(JSON.parse(atob(result.data)))
    }

    return (
        <View style={{flex: 1}}>
            <CameraView BarcodeBounds={{size: 50}} style={{flex: 1}}
                        barcodeScannerSettings={{
                            barcodeTypes: ["qr"],
                        }} onBarcodeScanned={hasScanned ? undefined : onBarcodeScanned}>
            </CameraView>
            <View className={"p-4 bg-black"}>
                <Button className={"mb-8"} variant={"destructive"} onPress={cancelClicked}>
                    {t("Cancel")}
                </Button>
            </View>
        </View>
    )
}
