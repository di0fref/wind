import * as React from 'react'
import {SafeAreaView, ScrollView, View, Text} from 'react-native'
import Overlay from "./Overlay";
import {defaultText} from "../assets/styles/default";
import {useAuth} from "../contexts/AuthContext";
import {useFocusEffect, useTheme} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import {useCallback, useState} from "react";

export default function MainView({children, classes}) {
    return (
        <SafeAreaView style={{flexGrow: 1}}>
            <LoggedInData/>
            <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: "#fff", padding: 20}}>
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
        </View>
    )
}
