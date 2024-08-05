import MainView from "../components/MainView";
import {Text, View} from "react-native";
import {showTransition, t} from "../lib/utils";
import {Link, useNavigation} from "expo-router";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useAuth} from "../contexts/AuthContext";
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button} from "../components/button";
import {Eye, EyeOff, Mail, User} from "lucide-react-native";
import {TextInput} from "@/components/text-input";
import Overlay from "../components/Overlay";

export default function Register() {

    const {register} = useAuth()
    const {t} = useTranslation()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password_confirm, setPassword_confirm] = useState("")
    const [showOverlay, setShowOverlay] = useState(false)

    const {setUserRole} = useAuth()

    const nav = useNavigation()

    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Name is required"),
        email: yup
            .string()
            .required('Email is required')
            .email('Invalid email'),
        password: yup
            .string()
            .required('Password is required')
            .min(8, 'Password must contain at least 8 characters'),
        password_confirmation: yup
            .string()
            .required("Password Confirm is required")
            .oneOf([yup.ref('password'), null], 'Must match "password" field value'),

    });


    const registerClicked = async (formData) => {
        setShowOverlay(true)
        await register({
            ...formData,
            device_name: "mobile"
        }, setShowOverlay, callback)
    }

    const callback = (data) => {
        // Register through api is always a Guest role
        setUserRole("Guest")
        nav.navigate("index")
    }

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "Fredrik Fahlstad",
            email: 'fredrik@fahlstad.se',
            password: 'password',
            password_confirmation: "password"
        },
    });

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
    return (
        <MainView>


            <View className={"flex-1 justify-center"}>

            <Text className={"text-center font-black text-2xl mb-4"}>{t("Enter your details")}</Text>

                <Text className={"mb-2 text-sm font-bold text-gray-900 dark:text-white"}>Name</Text>
                <View style={s.inputContainer}>
                    <Controller control={control} render={({field: {onChange, value}}) => (
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            placeholder="Name"
                        />
                    )} name={"name"}/>
                    <User style={s.icon} color={color}/>
                </View>

                <View className={"pb-2"}>
                    {errors.name && <Text className={"text-sm text-red-800"}>{errors.name.message}</Text>}
                </View>

                <Text className={"mb-2 text-sm font-bold text-gray-900 dark:text-white"}>Email</Text>
                <View style={s.inputContainer}>
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

                <Text className={"mb-2 text-sm font-bold text-gray-900 dark:text-white"}>Password</Text>

                <View style={s.inputContainer}>

                    <Controller control={control} render={({field: {onChange, value}}) => (
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            placeholder="Password"
                            secureTextEntry
                        />
                    )} name={"password"}/>
                    <Eye style={s.icon} color={color}/>
                </View>

                <View className={"pb-2"}>
                    {errors.password && <Text className={"text-sm text-red-800"}>{errors.password.message}</Text>}
                </View>

                <Text className={"mb-2 text-sm font-bold text-gray-900 dark:text-white"}>Repeat password</Text>

                <View style={s.inputContainer}>

                    <Controller control={control} render={({field: {onChange, value}}) => (
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            placeholder="Password Confirm"
                            secureTextEntry
                        />
                    )} name={"password_confirmation"}/>

                    <EyeOff style={s.icon} color={color}/>
                </View>
                <View className={"pb-2"}>
                    {errors.password_confirmation && <Text className={"text-sm text-red-800"}>{errors.password_confirmation.message}</Text>}
                </View>

                <View className={"mt-4"}>
                    <Button variant={"info"} onPress={handleSubmit(registerClicked)}>{"Register"}</Button>
                </View>
            </View>
            <Overlay show={showOverlay} text={t("Creating user")}/>

        </MainView>
    )
}
