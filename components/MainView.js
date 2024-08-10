import * as React from 'react'
import {SafeAreaView, ScrollView, View, Text, RefreshControl} from 'react-native'
import Overlay from "./Overlay";
import {defaultText} from "../assets/styles/default";
import {useAuth} from "../contexts/AuthContext";
import {useFocusEffect, useTheme} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import {useCallback, useState} from "react";
import i18n from "i18next";

export default function MainView({children, onRefresh, bg}) {
    const [refreshing, setRefreshing] = useState(false);

    return (
        <SafeAreaView style={{flexGrow: 1}}>
            {/*<LoggedInData/>*/}
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: bg?bg:"#fff",
                    padding: 20
                }}>
                <View className={"flex-1 w-full sm:w-3/5 mx-auto relative"}>
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}


function LoggedInData() {
    const {user, role} = useAuth()

    return (
        <View className={"p-4"}>
            <Text>User: {user?.name}</Text>
            <Text>Stage: {user?.stage}</Text>
            <Text>Session: {user?.house_session?.id}</Text>
            <Text>Role: {role}</Text>
            <Text>Lang: {i18n.language}</Text>
        </View>
    )
}
