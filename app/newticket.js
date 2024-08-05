import MainView from "../components/MainView";
import {useState} from "react";
import {api} from "../lib/http-common";
import {TextInput} from "../components/text-input";
import {defaultText} from "../assets/styles/default";
import {Modal, Switch, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import Select from "../components/Select";
import {Button} from "../components/button";
import {useNavigation} from "expo-router";
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAuth} from "../contexts/AuthContext";
import {CheckBox} from "react-native-web";
import {TextArea} from "../components/text-area";

export default function Newticket() {

    const [assignToMe, setAssignToMe] = useState(true);
    const toggleSwitch = () => setAssignToMe(previousState => !previousState);
    const [selectedId, setSelectedId] = useState(0);
    const nav = useNavigation()
    const [houses, setHouses] = useState([]);
    const {t} = useTranslation()
    const {user} = useAuth()

    const onSelect = (value) => {
        setSelectedId(value)
    }

    const debounce = (onChange) => {
        let timeout;
        return (e) => {
            const form = e;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                onChange(form);
            }, 500);
        };
    };

    const abortController = new AbortController()


    const onSearch = (keyword) => {

        if (keyword !== "") {
            api.post("/api/search/tickets", {
                address_street: keyword
            }).then((response) => {
                setHouses([...response.data]);
            }).catch(error => {
                console.error(error.message);
            })
        } else {
            setHouses([])
        }

    }

    const submit = (formData) => {

        api.post("/api/ticket", {
            ...formData,
            user_id: formData.assign_to_me ? user.id : ""
        }).then(res => {
            nav.goBack()
        }).catch(err => {
            console.error(err.message);
        })
    }


    const schema = yup.object().shape({
        title: yup
            .string()
            .required(t("Title is required")),
        description: yup
            .string()
            .required(t('Description is required')),
        house_id: yup
            .string()
            .required(t('House is required')),
    });

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "Title",
            description: 'description',
            house_id: "",
            assign_to_me: true
        },
    });


    return (


        <MainView>
            <View className={"flex-1 justify-center flex-col"}>
                <Text className={`${defaultText} text-center font-black text-2xl mb-6`}>{t("Create new ticket")}</Text>

                <View>
                    <Text className={"mb-2 text-sm font-bold text-gray-900 dark:text-white"}>Title</Text>

                    <Controller control={control} render={({field: {onChange, value}}) => (
                        <TextInput className={"mb-2"} value={value} onChangeText={onChange} placeholder={t("Title")}/>
                    )} name={"title"}/>

                    <View className={"pb-2"}>
                        {errors.title && <Text className={"text-sm text-red-800"}>{errors.title.message}</Text>}
                    </View>
                </View>

                <View>
                    <Text className={"mb-2 text-sm font-bold text-gray-900 dark:text-white"}>House</Text>
                    <Controller control={control} render={({field: {onChange, value}}) => (
                        <Select onSelect={onChange} searchPlaceHolderText={t("Search")} showSearchBox onSearch={
                            debounce((e) => {
                                onSearch(e);
                            })
                        } isSelectSingle={true} data={houses}/>
                    )} name={"house_id"}/>

                    <View className={"py-2"}>
                        {errors.house_id && <Text className={"text-sm text-red-800"}>{errors.house_id.message}</Text>}
                    </View>
                </View>

                <View>
                    <Text className={"mb-2 text-sm font-bold text-gray-900 dark:text-white"}>Description</Text>
                    <Controller control={control} render={({field: {onChange, value}}) => (
                        <TextArea className={"mb-2"} value={value} onChangeText={onChange} _multiline={true} placeholder={t("Description")}/>
                    )} name={"description"}/>

                    <View className={"pb-2"}>
                        {errors.description && <Text className={"text-sm text-red-800"}>{errors.description.message}</Text>}
                    </View>
                </View>



                <View className={"flex flex-row justify-end items-center"}>
                    <Text className={`${defaultText} mr-4`}>Assign to me</Text>
                    <Controller control={control} render={({field: {onChange, value}}) => (
                        <Switch onValueChange={onChange} value={value}/>
                    )} name={"assign_to_me"}/>
                </View>

                <Button className={"mt-6"} variant={"info"} onPress={handleSubmit(submit)}>{t("Submit")}</Button>
            </View>
        </MainView>
    )
}


