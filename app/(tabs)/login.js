import {View, Text, Pressable} from "react-native";
import tw from "twrnc";
import {TextInput} from "@/components/text-input";
import {Button} from "@/components/button";
import MainView from "../../components/MainView";
import {defaultInput, defaultText} from "../../assets/styles/default";
import {useEffect, useState} from "react";
import {useNavigation, Link} from "expo-router";
import {useAuth} from "../../contexts/AuthContext";
import {showTransition, t} from "../../lib/utils";
import Overlay from "../../components/Overlay";
import {Mail, User} from "lucide-react-native";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Login() {

    const [email, setEmail] = useState("kalle@kalle.se")
    const [password, setPassword] = useState("password")
    const [hasMultipleRoles, setHasMultipleRoles] = useState(false)
    const nav = useNavigation()
    const {login, setUserRole, setSelectingRole, user} = useAuth()

    const [showOverlay, setShowOverlay] = useState(false)

    const onClick = async (formData) => {

        // setShowOverlay(true)
        await login(
            {
                ...formData,
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

    const s = {
        inputContainer: {
            justifyContent: 'center',
        },
        input: {
            height: 50,
        },
        icon: {
            position: 'absolute',
            right: 10,
        }
    }

    const color = "lightgray"

    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Email is required')
            .email('Invalid email'),
        password: yup
            .string()
            .required('Password is required')

    });
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: 'kalle@kalle.se',
            password: 'password',
        },
    });

    return (
        <MainView classes={""}>
            <View className="h-full items-center justify-center">
                <View className="flex flex-col w-full items-center justify-center">

                    <View className="w-full h-full p-4 justify-center">
                        <View className="space-y-4 sm:p-8">
                            <Text className="text-2xl font-black text-center leading-tight tracking-tight text-gray-900 mb-8">
                                {t("Sign in to your account")}
                            </Text>
                            <View className="">


                                <Text className={"mb-2 text-sm font-bold text-gray-900 dark:text-white"}>Email</Text>
                                <View className={""} style={s.inputContainer}>
                                    <Controller control={control} render={({field: {onChange, value}}) => (
                                        <TextInput
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder="Email"
                                        />
                                    )} name={"email"}/>
                                    <Mail style={s.icon} color={color}/>
                                </View>
                                <View className={"pb-2"}>
                                    {errors.email && <Text className={"text-sm text-red-800"}>{errors.email.message}</Text>}
                                </View>


                                <Text className={"mb-2  text-sm font-bold text-gray-900 dark:text-white"}>Password</Text>
                                <View className={""} style={s.inputContainer}>
                                    <Controller control={control} render={({field: {onChange, value}}) => (
                                        <TextInput
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder="Password"
                                        />
                                    )} name={"password"}/>
                                    <Mail style={s.icon} color={color}/>
                                </View>

                                <View className={"pb-2"}>
                                    {errors.password && <Text className={"text-sm text-red-800"}>{errors.password.message}</Text>}
                                </View>


                                <Button className={"mt-8"} onPress={handleSubmit(onClick)} variant={"info"}>{t("Sign in")}</Button>
                                <Text className="text-sm font-light text-gray-500 mt-8">
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

