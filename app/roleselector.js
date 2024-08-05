import {TouchableOpacity, View, Text} from "react-native";
import MainView from "../components/MainView";
import {useNavigation} from "expo-router";
import {useAuth} from "../contexts/AuthContext";
import {t} from "../lib/utils";
import {defaultText} from "../assets/styles/default";
import {Button} from "../components/button";

export default function Roleselector() {

    const {user, setUserRole, setSelectingRole, logout} = useAuth()
    const nav = useNavigation()

    const setRole = (val) => {
        setUserRole(val)
        setSelectingRole(false)
        nav.navigate("index")
    }


    return (
        <MainView>
            <View className={"flex-1 justify-center bg-white p-4 _shadow-md _rounded-lg"}>

                <Text className={"text-2xl font-black text-center mb-8"} key={"text"}>{t("Please select the role you would like to use.")}</Text>
                {user?.roles?.map(role => (
                    (
                        <View className={"bg-neutral-50 p-3 mb-3 border border-neutral-200 rounded"} key={role?.name}>
                            <TouchableOpacity onPress={e => setRole(role?.name)}>
                                <Text className={`${defaultText} font-bold mb-1`}>{role?.name}</Text>
                                <Text className={`${defaultText}`}>{role?.description}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                ))}
                <Button className={"mt-4"} onPress={() => {
                    logout()
                    nav.goBack()
                }} variant={"destructive"}>Cancel</Button>
            </View>
        </MainView>
    )
}
