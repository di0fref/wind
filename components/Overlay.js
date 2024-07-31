import {ActivityIndicator, Modal, View, Text, StyleSheet, Pressable, Alert} from "react-native";
import {useEffect, useState} from "react";
import {defaultText} from "../assets/styles/default";

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        // backgroundColor: 'rgba(0, 0, 0, 0.8)',
        // height: '100%',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
})
export default function Overlay({show, text}) {
    const [modalVisible, setModalVisible] = useState(false)
    useEffect(() => {
        setModalVisible(show)
    }, [show]);
    // const theme = useTheme()


    return (

        <Modal
            animationType={'fade'}
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible)
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(100,100,100, 0.5)',
                    padding: 20,
                }}
            >

                <View className={"bg-white w-3/5 mx-auto p-6 rounded-md shadow-md justify-center items-center"}>
                    <View className={"flex flex-row items-center justify-center gap-x-2"}>
                        {/*<View>*/}
                            <Text className={`${defaultText} mt-1`}><ActivityIndicator color={"black"} animating={true}/></Text>
                        {/*</View>*/}
                        {/*<View>*/}
                            <Text className={`${defaultText}`}>{text}</Text>
                        {/*</View>*/}
                    </View>
                </View>
            </View>
        </Modal>
    )
}
