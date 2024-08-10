import {View, Text} from "react-native";
import {TextInput} from "@/components/text-input";
import {Button} from "@/components/button";
import MainView from "../../components/MainView";
import {useEffect, useState} from "react";
import {useNavigation, Link} from "expo-router";
import {useAuth} from "../../contexts/AuthContext";
import Overlay from "../../components/Overlay";
import {EyeOff, Mail, User} from "lucide-react-native";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useTranslation} from "react-i18next";

export default function Login() {

    const nav = useNavigation()
    const {login, setUserRole, setSelectingRole} = useAuth()
    const {t} = useTranslation()
    const [isLoading, setIsLoading] = useState(false)

    const onClick = async (formData) => {

        // setIsLoading(true)
        login({...formData, device_name: "mobile"}, loginCallBack)
    }

    function loginCallBack(res) {
        console.log(JSON.stringify("loginCallBack", null, 2))
        if (res.roles.length > 1) {
            setSelectingRole(true)
            nav.navigate("roleselector")
        } else {
            setUserRole(res?.roles[0]?.name)
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
            email: 'fredrik.fahlstad@gmail.com',
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


                                <Text className={"mb-2 text-sm font-bold text-gray-900 dark:text-white"}>{t("Email")}</Text>
                                <View className={""} style={s.inputContainer}>
                                    <Controller control={control} render={({field: {onChange, value}}) => (
                                        <TextInput
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder={t("Email")}
                                        />
                                    )} name={"email"}/>
                                    <Mail style={s.icon} color={color}/>
                                </View>
                                <View className={"pb-2"}>
                                    {errors.email && <Text className={"text-sm text-red-800"}>{errors.email.message}</Text>}
                                </View>


                                <Text className={"mb-2  text-sm font-bold text-gray-900 dark:text-white"}>{t("Password")}</Text>
                                <View className={""} style={s.inputContainer}>
                                    <Controller control={control} render={({field: {onChange, value}}) => (
                                        <TextInput
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder={t("Password")}
                                        />
                                    )} name={"password"}/>
                                    <EyeOff style={s.icon} color={color}/>
                                </View>

                                <View className={"pb-2"}>
                                    {errors.password && <Text className={"text-sm text-red-800"}>{errors.password.message}</Text>}
                                </View>


                                <Button disabled={isLoading ?? true} className={"mt-8"} onPress={handleSubmit(onClick)} variant={"info"}>
                                    {isLoading ? t("Signing in...") : t("Sign in")}
                                </Button>

                                <Text className="text-sm font-light text-gray-500 mt-8">
                                    {t("Don’t have an account yet?")} <Link className={"text-blue-800"} href={"register"}>{t("Sign up")}</Link>
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {/*<Overlay show={isLoading} text={t("Logging in...")}/>*/}
        </MainView>
    );
};

