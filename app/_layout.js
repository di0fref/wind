import 'react-native-reanimated';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack, useNavigation} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import "../global.css"
import * as SecureStore from 'expo-secure-store';
import {Appearance, Text, TouchableOpacity} from "react-native";
import {AuthProvider, useAuth} from "../contexts/AuthContext";
import {useColorScheme} from "nativewind";
import {getSecureData} from "../lib/utils";
import {Icon} from "lucide-react-native";
import tw from "twrnc";
import {MaterialIcons} from "@expo/vector-icons";
import {t} from "../lib/utils"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    const {colorScheme} = useColorScheme();
    const nav = useNavigation()

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        // SecureStore.setItem("theme", JSON.stringify(""))
        //
        // const get = async () => {
        //     let theme = await getSecureData("theme")
        //     if (theme) {
        //         Appearance.setColorScheme(theme)
        //     }
        // }
        // get()
    }, []);


    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }


    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <AuthProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen name="roleselector" options={{headerTitle: "Select role", presentation: "modal", headerShown: true}}/>
                    <Stack.Screen name="modalticket" options={{
                        headerBackTitle: t("Back"),
                        headerTitle: "Ticket",
                        _presentation: "modal",
                        headerShown: true,
                        headerRight:  () => (
                            <TouchableOpacity onPress={nav.goBack}>
                                <MaterialIcons name="close" size={24} style={tw`text-neutral-600`}/>
                            </TouchableOpacity>
                        )
                    }}/>
                    <Stack.Screen name="+not-found"/>
                    <Stack.Screen name="register" options={{headerTitle: "Register", headerBackTitle:t("Back"), headerShown: true}}/>
                    <Stack.Screen name="settingsmodal" options={{headerShown: false, presentation: 'modal', title: t("Settings")}}/>
                </Stack>
            </AuthProvider>
        </ThemeProvider>
    );
}
