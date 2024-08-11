import 'react-native-reanimated';
import "@/global.css";
import {DarkTheme, DefaultTheme, ThemeProvider, useTheme} from '@react-navigation/native';
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
import {getLocales} from "expo-localization";
import i18n from "i18next";
import {useTranslation} from "react-i18next";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    const {colorScheme} = useColorScheme();
    const nav = useNavigation()

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    const {t} = useTranslation();
    useEffect(() => {
        // Set user language or fallback
        async function getUserLang() {
            let lang = await getSecureData("lang");
            let l = lang ? lang : getLocales()?.[0]?.languageCode ?? "se"
            await i18n.changeLanguage(l)
        }

        getUserLang()
        // console.log("LL",JSON.stringify(getSecureData("lang"), null, 2))


    }, [])


    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }
    const queryClient = new QueryClient();


    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <QueryClientProvider client={queryClient}>

                <AuthProvider>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                        <Stack.Screen name="roleselector" options={{headerTitle: "Select role", presentation: "modal", headerShown: true}}/>
                        <Stack.Screen name="modalticket" options={{
                            headerBackTitle: t("Back"),
                            headerTitle: t("Ticket"),
                            _presentation: "modal",
                            headerShown: true,
                            headerRight: () => (
                                <TouchableOpacity onPress={nav.goBack}>
                                    <MaterialIcons name="close" size={24} style={tw`text-neutral-600`}/>
                                </TouchableOpacity>
                            )
                        }}/>
                        <Stack.Screen name="+not-found"/>
                        <Stack.Screen name="register" options={{headerTitle: t("Register"), headerBackTitle: t("Back"), headerShown: true}}/>
                        <Stack.Screen name="settingsmodal" options={{headerShown: false, presentation: 'modal', title: t("Settings")}}/>
                        <Stack.Screen name="newticket" options={{
                            headerBackTitle: t("Back"),
                            headerRight: () => (
                                <TouchableOpacity onPress={nav.goBack}>
                                    <MaterialIcons name="close" size={24} style={tw`text-neutral-600`}/>
                                </TouchableOpacity>
                            ),
                            headerShown: true, _presentation: 'modal', title: t("New Ticket")
                        }}/>

                    </Stack>
                </AuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
