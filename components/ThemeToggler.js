import React, {useEffect} from 'react';

import {Appearance, Pressable, Text, TouchableOpacity} from "react-native"

import * as SecureStore from 'expo-secure-store';
import {useColorScheme} from "nativewind";
import {setSecureData} from "../lib/utils";

export default function ThemeToggler() {
    const { colorScheme, toggleColorScheme } = useColorScheme();

    useEffect(() => {
        setSecureData("theme", colorScheme)
        // Appearance.setColorScheme(colorScheme)
    }, [colorScheme]);


    return (
        <TouchableOpacity
            onPress={toggleColorScheme}
            className="flex-1 items-center justify-center dark:bg-slate-800"
        >
            <Text
                selectable={false}
                className="dark:text-white"
            >
                {`${colorScheme === "dark" ? "🌙" : "🌞"}`}
            </Text>
        </TouchableOpacity>
    );
}
