import {View, Text, Pressable} from "react-native";
import tw from "twrnc";
import {TextInput} from "@/components/text-input";
import {Button} from "@/components/button";
import MainView from "../../components/MainView";
import {defaultInput, defaultText} from "../../assets/styles/default";
import {useState} from "react";
import {useNavigation, Link} from "expo-router";
import {useAuth} from "../../contexts/AuthContext";
import {showTransition, t} from "../../lib/utils";
import Overlay from "../../components/Overlay";

export default function Login() {

    const [email, setEmail] = useState("kalle@kalle.se")
    const [password, setPassword] = useState("password")
    const [hasMultipleRoles, setHasMultipleRoles] = useState(false)
    const nav = useNavigation()
    const {login, setUserRole, setSelectingRole} = useAuth()

    const [showOverlay, setShowOverlay] = useState(false)
    const onClick = async () => {

        // setShowOverlay(true)
        await login(
            {
                email: email,
                password: password,
                device_name: "mobile"
            }, loginCallBack, setShowOverlay)
    }

    function loginCallBack(res) {
        console.log(JSON.stringify("loginCallBack", null, 2))
        if (res.roles.length > 1) {
            setSelectingRole(true)
            nav.navigate("roleselector")
        } else {
            setUserRole(res.roles[0])
            nav.navigate("index")
        }
    }

    return (
        <MainView classes={""}>
            <View className="h-full items-center justify-center">
                <View className="flex flex-col w-full items-center justify-center">

                    <View className="w-full h-full p-4 justify-center">
                        <View className="space-y-4 sm:p-8">
                            <Text className="text-2xl font-black text-center leading-tight tracking-tight text-gray-900">
                                {t("Sign in to your account")}
                            </Text>
                            <View className="space-y-4 md:space-y-6">
                                <View>
                                    <TextInput value={email} onChangeText={email => setEmail(email)} placeholder="Email" _className={`${defaultInput}`}/>
                                </View>
                                <View>
                                    <TextInput value={password} onChangeText={pass => setPassword(pass)} placeholder="Password" _className={`${defaultInput}`}/>
                                </View>
                                <Button onPress={onClick} variant={"info"}>{t("Sign in")}</Button>
                                <Text className="text-sm font-light text-gray-500">
                                    {t("Don’t have an account yet?")} <Link className={"text-blue-800"} href={"register"}>Sign up</Link>
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <Overlay show={showOverlay} text={t("Logging in...")}/>
        </MainView>
    );
};

