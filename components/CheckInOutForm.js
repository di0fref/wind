import {useColorScheme, View, Text} from "react-native";
import {Fragment, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {api} from "../lib/http-common";
import {useAuth} from "../contexts/AuthContext";
import Stepper from "./Stepper";
import MainView from "./MainView";
import {TextInput} from "./text-input";
import {useTranslation} from "react-i18next";
import {Button} from "./button";
import {defaultText} from "../assets/styles/default";


export default function CheckInOutForm({data, link, action, useLangField, setIsDone}) {

    const [categoryIndex, setCategoryIndex] = useState(0)
    const [listIndex, setListIndex] = useState(0)
    const [showTextArea, setShowTextArea] = useState(false)
    const [message, setMessage] = useState("")
    const router = useNavigation();
    const [formData, setFormData] = useState(data)
    const [list, setList] = useState(data)
    const [done, setDone] = useState(false)
    const {me} = useAuth()

    const {t} = useTranslation()

    const yesHandler = () => {
        setListIndex(prevState => prevState + 1)
        updateFormData("approved", true)
    }

    const yesFormHandler = () => {
        setListIndex(prevState => prevState + 1)
        updateFormData("message", message)
        setMessage("")
    }

    const noHandler = () => {
        if (list.list_template_categories[categoryIndex]?.list_template_items[listIndex].show_text_area) {
            setShowTextArea(true)
        } else {
            updateFormData("approved", false)
        }
    }
    const skipFormHandler = () => {
        setMessage("")
        setShowTextArea(false)
    }
    useEffect(() => {
        setList(data)
        setFormData(data)
    }, [data])

    useEffect(() => {
        if (categoryIndex === list?.list_template_categories.length) {
            setDone(true)

            setListIndex(0)
            setCategoryIndex(0)


            submit()
            router.navigate(link)

        }
    }, [categoryIndex])

    const submit = () => {
        api.post("/api/" + action, {
            data: formData
        }).then(res => {
            me()
            // router.navigate(link)
        }).catch(err => {
            console.log(JSON.stringify(err.response.data.message, null, 2))
        })
    }

    useEffect(() => {
        if (listIndex > list?.list_template_categories[categoryIndex]?.list_template_items.length - 1) {
            setListIndex(0)
            setCategoryIndex(prevState => prevState + 1)
        }
        setShowTextArea(false)
    }, [listIndex])

    const updateFormData = (param, value) => {
        formData.list_template_categories[categoryIndex].list_template_items[listIndex][param] = value
    }

    if (!list?.list_template_categories) {
        return <></>
    }
    return (
        <>
            {!done &&
                <>
                    <MainView>
                        <View style={{flex: 1, alignContent: "center", justifyContent: "space-between"}}>
                            <View>
                                <View style={{marginBottom: 20}}>
                                    <Stepper key={categoryIndex} list={list} current={categoryIndex}/>
                                </View>

                                <Text>{t(list.list_template_categories[categoryIndex]?.name)}</Text>

                                <Text className={`${defaultText} font-bold `} style={{textAlign: "center", marginBottom: 20}}>{listIndex + 1} {t("of")} {list?.list_template_categories[categoryIndex]?.list_template_items.length}</Text>
                                <Text className={"font-bold text-xl  w-72 mx-auto"} style={{textAlign: "center", marginBottom: 10}}>{list?.list_template_categories[categoryIndex]?.list_template_items[listIndex]?.[useLangField.text]}</Text>
                                <Text className={`${defaultText}  w-72 mx-auto`} style={{textAlign: "center"}}>{list?.list_template_categories[categoryIndex]?.list_template_items[listIndex]?.[useLangField.help]}</Text>

                                {showTextArea &&
                                    <View>
                                        <TextInput style={{marginTop: 20}} value={message}
                                                   onChangeText={e => setMessage(e)}
                                                   placeholder={t("Please enter a comment")}
                                                   mode={"outlined"}
                                                   multiline={true}/>
                                        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 15}}>
                                            {/*<Button onPress={noHandler} style={{*/}
                                            {/*    width: "40%",*/}
                                            {/*    backgroundColor: "grey"*/}
                                            {/*}} mode={"contained"}>{t("Skip")}</Button>*/}

                                            <Button onPress={yesFormHandler} style={{
                                                width: "40%",
                                            }} variant={"success"}>{t("Save")}</Button>
                                        </View>
                                    </View>
                                }

                            </View>

                            <View style={{marginBottom: 30, alignContent: "center", justifyContent: "center", flexDirection: "row", gap: 80}}>

                                {!showTextArea &&
                                    <>
                                        <Button onPress={noHandler} variant={"info"} style={{
                                            backgroundColor: "#b65348",
                                            width: 100,
                                        }}>{t("No")}</Button>
                                        <Button onPress={yesHandler} variant={"info"} style={{
                                            backgroundColor: "#5ab686",
                                            width: 100,
                                        }}>{t("Yes")}</Button>
                                    </>
                                }
                            </View>
                        </View>
                    </MainView>
                </>
            }
        </>

    )

}
