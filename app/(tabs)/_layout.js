import {Tabs, useNavigation} from 'expo-router';
import React, {useEffect} from 'react';
import {useColorScheme, Text, TouchableOpacity} from "react-native";
import {useAuth} from "../../contexts/AuthContext";
import {Drawer} from "expo-router/drawer";
import {House, Wrench, Download, Upload, CircleHelp, User, Cog} from "lucide-react-native";
import {useTranslation} from "react-i18next";
import {defaultText} from "../../assets/styles/default";
import {TabBarIcon} from "../../components/navigation/TabBarIcon";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const {isSignedIn, role, user} = useAuth()
    const nav = useNavigation()
    const {t} = useTranslation()

    useEffect(() => {
        if (!isSignedIn) {
            nav.navigate("login")
        }
    }, [isSignedIn]);

    const hidden = {
        tabBarItemStyle: {
            display: "none"
        }
    }

    return (

        <Drawer
            screenOptions={{
                headerShown: true, headerRight: () => {
                    return (<TouchableOpacity className={"mr-2"} onPress={() => nav.navigate("settingsmodal")}>
                        <Cog/>
                    </TouchableOpacity>)
                }
            }}>

            <Drawer.Screen name={"login"} options={{
                drawerLabel: t("Log in"),
                title: t("Log in"),
                drawerItemStyle: {
                    display: isSignedIn ? "none" : "",
                },
                drawerIcon: ({color, focused}) => (
                    <User/>
                )
            }}/>


            <Drawer.Screen name={"index"} options={{
                drawerLabel: t('Home'),
                title: t('Home'),
                drawerIcon: ({color, focused}) => (
                    <House/>
                ),
                drawerItemStyle: {
                    display: (isSignedIn) ? "block" : "none"
                },
            }}/>

            <Drawer.Screen name={"tickets"} options={{
                drawerLabel: t("Tickets"),
                title: t("Tickets"),
                drawerItemStyle: {
                    display: (role === "Service") ? "block" : "none"
                },
                drawerIcon: ({color, focused}) => (
                    <Wrench/>
                )
            }}/>


            <Drawer.Screen name={"checkin"} options={{
                drawerLabel: t("Check-In"),
                title: t("Check-In"),
                drawerItemStyle: {
                    display: (user.stage === "scanned") ? "block" : "none"
                },
                drawerIcon: ({color, focused}) => (
                    <Download/>
                ),
            }}/>

            <Drawer.Screen name={"manual"} options={{
                drawerLabel: t("Manuals"),
                title: t("Manuals"),
                drawerItemStyle: {
                    display: (isSignedIn ? (role === "Service") ? "none" : "" : "block")
                },
                drawerIcon: ({color, focused}) => (
                    <Download/>
                ),
            }}/>

            <Drawer.Screen name={"checkout"} options={{
                drawerLabel: t("Check-Out"),
                title: t("Check-Out"),
                drawerIcon: ({color, focused}) => (
                    <Upload/>
                ),
                drawerItemStyle: {
                    display: (user.stage === "checked_in") ? "block" : "none"
                }
            }}/>


            <Drawer.Screen name={"customerservice"} options={{
                drawerLabel: t("Customer Service"),
                title: t("Customer Service"),
                drawerIcon: ({color, focused}) => (
                    <CircleHelp/>
                )
            }}/>


            <Drawer.Screen name={"checkindone"} options={{drawerItemStyle: {display: "none"}}}/>
            <Drawer.Screen name={"checkoutdone"} options={{drawerItemStyle: {display: "none"}}}/>
        </Drawer>

    )
    // return (
    //     <Tabs
    //         screenOptions={{
    //              headerShown: true, headerRight: () => {
    //                 return (<TouchableOpacity className={"mr-2"} onPress={() => nav.navigate("settingsmodal")}>
    //                     <Text className={`${defaultText}`}>See</Text>
    //                 </TouchableOpacity>)
    //             }
    //         }}>
    //
    //
    //         <Tabs.Screen name="index" options={{
    //             title: 'Home',
    //             tabBarIcon: ({color, focused}) => (
    //                 <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
    //             ),
    //             tabBarItemStyle: {
    //                 display: !isSignedIn ? "none" : "",
    //             },
    //         }}
    //         />
    //         <Tabs.Screen name={"checkin"} options={{...hidden, headerTitle: t("Check-In"), headerShown: true}}/>
    //         <Tabs.Screen name={"checkout"} options={{...hidden, headerTitle: t("Check-Out"), headerShown: true}}/>
    //         <Tabs.Screen name={"checkindone"} options={{...hidden, headerTitle: t("Check-In Done"), headerShown: true}}/>
    //         <Tabs.Screen name={"checkoutdone"} options={{...hidden, headerTitle: t("Check-Out Done"), headerShown: true}}/>
    //
    //         <Tabs.Screen name={"login"} options={{
    //             tabBarItemStyle: {
    //                 display: isSignedIn ? "none" : "",
    //             },
    //             headerTitle: t("Login"),
    //             headerShown: true
    //         }}/>
    //
    //         <Tabs.Screen name={"tickets"} options={{
    //             headerTitle: t("Tickets"),
    //             headerShown: true,
    //             tabBarItemStyle: {
    //                 display: isSignedIn
    //                     ? role !== "Service" ? "none" : ""
    //                     : "none"
    //             },
    //         }}/>
    //     </Tabs>
    // )
}
