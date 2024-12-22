import React, {useEffect, useState} from 'react';
import {useColorScheme, Text, TouchableOpacity} from "react-native";
import {useAuth} from "../../contexts/AuthContext";
// import {Drawer} from "expo-router/drawer";
import {House, Wrench, Download, Upload, CircleHelp, User, Cog, BookOpenText, Map} from "lucide-react-native";
import {useTranslation} from "react-i18next";
// import {createNavigationContainerRef, useNavigation} from "@react-navigation/native";

import {Drawer} from 'expo-router/drawer';

import Login from "./login";
import HomeScreen from "./index";
import Checkin from "./checkin";
import Checkout from "./checkout";
import Manual from "./manual";
import Checkoutdone from "./checkoutdone";
import Checkindone from "./checkindone";
import Tickets from "./tickets";
import Customerservice from "./customerservice";
// import {createDrawerNavigator} from '@react-navigation/drawer';
import Ts from "./ts";
import Ordermodal from "./ordermodal";
import {useRouter, useNavigation, useNavigationContainerRef, Tabs, useRootNavigation} from 'expo-router';

// const Drawer = createDrawerNavigator();
// const navigationRef = createNavigationContainerRef();


export default function DrawerLayout() {
    const {isSignedIn, role, user} = useAuth()
    const nav = useRouter()
    const {t} = useTranslation()
    const rootNavigation = useRootNavigation();

    const [isNavigationReady, setNavigationReady] = useState(false);

    useEffect(() => {
        const unsubscribe = rootNavigation?.addListener("state", (event) => {
            setNavigationReady(true);
        });
        return function cleanup() {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [rootNavigation]);


    useEffect(() => {
        if (!isNavigationReady) {
            return;
        }
        else{
            if(!isSignedIn) {
                nav.navigate("login");
            }
        }
    }, [isNavigationReady, isSignedIn]);

    return (
        <Tabs

            screenOptions={{
                headerShown: true,
                headerRight: () => {
                    return (
                        <TouchableOpacity className={"mr-2"} onPress={() => nav.navigate("settingsmodal")}>
                            <Cog/>
                        </TouchableOpacity>)
                }
            }}>



            <Tabs.Screen
                name="index" // This is the name of the page and must match the url from root
                options={{
                    tabBarLabel: t("Start"),
                    title: t("Start"),
                    tabBarIcon: ({color, focused}) => (
                        <House color={color}/>
                    ),
                    tabBarItemStyle: {display: isSignedIn ? "block" : "none"}
                }}
            />
            <Tabs.Screen
                name="login" // This is the name of the page and must match the url from root
                options={{
                    tabBarLabel: t("Login"),
                    title: t("Login"),
                    tabBarIcon: ({color, focused}) => (
                        <House color={color}/>
                    ),
                    tabBarItemStyle: {display: isSignedIn ? "none" : "block"}
                }}
            />
            <Tabs.Screen
                name="customerservice" // This is the name of the page and must match the url from root
                options={{
                    tabBarLabel: t("Customer Service"),
                    title: t("Customer Service"),
                    tabBarIcon: ({color, focused}) => (
                        <CircleHelp color={color}/>
                    ),
                }}
            />

            <Tabs.Screen
                name="settings" // This is the name of the page and must match the url from root
                options={{
                    tabBarLabel: t("Settings"),
                    title: t("Settings"),
                    tabBarIcon: ({color, focused}) => (
                        <Cog color={color}/>
                    ),
                }}
            />

            <Tabs.Screen name={"t"} options={{tabBarItemStyle: {display: "none"}}}/>
            <Tabs.Screen name={"ts"} options={{tabBarItemStyle: {display: "none"}}}/>
            {/*<Drawer.Screen name={"login"} options={{drawerItemStyle: {display: "none"}}}/>*/}
            <Tabs.Screen name={"checkin"} options={{title: t("Check In"), tabBarItemStyle: {display: "none"}}}/>
            <Tabs.Screen name={"tickets"} options={{tabBarItemStyle: {display: "none"}}}/>
            <Tabs.Screen name={"checkout"} options={{title: t("Check Out"), tabBarItemStyle: {display: "none"}}}/>
            <Tabs.Screen name={"ordermodal"} options={{tabBarItemStyle: {display: "none"}}}/>
            <Tabs.Screen name={"checkindone"} options={{title: t("Check-In-Done"), tabBarItemStyle: {display: "none"}}}/>
            <Tabs.Screen name={"checkoutdone"} options={{title: t("Check-Out-Done"), tabBarItemStyle: {display: "none"}}}/>
            <Tabs.Screen name={"manual"} options={{tabBarItemStyle: {display: "none"}}}/>
            {/*<Tabs.Screen name={"roleselector"} options={{title: t("RoleSelector"), tabBarItemStyle: {display: "none"}}}/>*/}

        </Tabs>
    )
    // return (
    // <Drawer.Navigator
    //     screenOptions={{
    //         headerShown: true,
    //         headerRight: () => {
    //             return (
    //                 <TouchableOpacity className={"mr-2"} onPress={() => nav.navigate("settingsmodal")}>
    //                     <Cog/>
    //                 </TouchableOpacity>)
    //         }
    //     }}>

    //     {isSignedIn ? (
    //         <>
    //
    //             {/*<Drawer.Screen options={{*/}
    //             {/*    drawerLabel: t("T"),*/}
    //             {/*    title: t("T"),*/}
    //             {/*    drawerIcon: ({color, focused}) => (*/}
    //             {/*        <House/>*/}
    //             {/*    ),*/}
    //             {/*}} name={"ticks"} component={Ts}/>*/}
    //
    //             {/*<Drawer.Screen options={{*/}
    //             {/*    drawerLabel: t("Ärende"),*/}
    //             {/*    title: t("Ärende"),*/}
    //             {/*    drawerIcon: ({color, focused}) => (*/}
    //             {/*        <House/>*/}
    //             {/*    ),*/}
    //             {/*}} name={"ordermodal"} component={Ordermodal}/>*/}
    //
    //             <Drawer.Screen options={{
    //                 drawerLabel: t("Start"),
    //                 title: t("Start"),
    //                 drawerIcon: ({color, focused}) => (
    //                     <House/>
    //                 ),
    //             }} name={"index"} component={HomeScreen}/>
    //
    //             {/*// ---------------------------------------------------------------------------*/}
    //
    //             {/*<Drawer.Screen name={"tickets"} options={{*/}
    //             {/*    drawerItemStyle: {*/}
    //             {/*        display: (role === "Service") ? "block" : "none",*/}
    //             {/*    },*/}
    //             {/*    drawerLabel: t("Tickets"),*/}
    //             {/*    title: t("Tickets"),*/}
    //             {/*    drawerIcon: ({color, focused}) => (*/}
    //             {/*        <Wrench/>*/}
    //             {/*    )*/}
    //             {/*}} component={Tickets}/>*/}
    //
    //             {/*// ---------------------------------------------------------------------------*/}
    //
    //
    //             <Drawer.Screen name={"checkin"} options={{
    //                 drawerItemStyle: {
    //                     display:
    //                         (role === "Service") ? "none" :
    //                             (user.stage === "scanned") ? "block" : "none",
    //                 },
    //                 drawerLabel: t("Check-In"),
    //                 title: t("Check-In"),
    //                 drawerIcon: ({color, focused}) => (
    //                     <Download/>
    //                 ),
    //             }} component={Checkin}/>
    //
    //             {/*// ---------------------------------------------------------------------------*/}
    //
    //             <Drawer.Screen name={"checkout"} options={{
    //                 drawerItemStyle: {
    //                     display: (role === "Service") ? "none" :
    //                         (user.stage === "checked_in") ? "block" : "none",
    //                 },
    //                 drawerLabel: t("Check-Out"),
    //                 title: t("Check-Out"),
    //                 drawerIcon: ({color, focused}) => (
    //                     <Upload/>
    //                 ),
    //             }} component={Checkout}/>
    //
    //             {/*// ---------------------------------------------------------------------------*/}
    //
    //             <Drawer.Screen name={"checkindone"} options={{
    //                 drawerLabel: t("Check-In-Done"),
    //                 title: t("Check-In-Done"),
    //                 drawerItemStyle: {
    //                     display: "none"
    //                 }
    //             }} component={Checkindone}/>
    //
    //             {/*// ---------------------------------------------------------------------------*/}
    //
    //             <Drawer.Screen name={"checkoutdone"} options={{
    //                 drawerLabel: t("Check-Out-Done"),
    //                 title: t("Check-Out-Done"),
    //                 drawerItemStyle: {
    //                     display: "none"
    //                 }
    //             }} component={Checkoutdone}/>
    //         </>
    //     ) : (
    //         <></>
    //     )}
    //
    //     <Drawer.Screen name={"login"} options={{
    //         drawerLabel: t("Sign in"),
    //         title: t("Sign in"),
    //         drawerItemStyle: {
    //             display: isSignedIn ? "none" : "block",
    //         },
    //         drawerIcon: ({color, focused}) => (
    //             <User/>
    //         )
    //     }} component={Login}/>
    //
    //     {/*// ---------------------------------------------------------------------------*/}
    //
    //     {/*<Drawer.Screen name={"manual"} options={{*/}
    //     {/*    drawerLabel: t("Manuals"),*/}
    //     {/*    title: t("Manuals"),*/}
    //     {/*    drawerItemStyle: {*/}
    //     {/*        display: (isSignedIn ? (role === "Service") ? "none" : "" : "block")*/}
    //     {/*    },*/}
    //     {/*    drawerIcon: ({color, focused}) => (*/}
    //     {/*        <BookOpenText/>*/}
    //     {/*    ),*/}
    //     {/*}} component={Manual}/>*/}
    //
    //     {/*// ---------------------------------------------------------------------------*/}
    //
    //     <Drawer.Screen name={"customerservice"} options={{
    //         drawerLabel: t("Customer Service"),
    //         title: t("Customer Service"),
    //         drawerIcon: ({color, focused}) => (
    //             <CircleHelp/>
    //         )
    //     }} component={Customerservice}/>
    //
    //
    // </Drawer.Navigator>
    // )
}

// import {defaultText} from "../../assets/styles/default";
// import {TabBarIcon} from "../../components/navigation/TabBarIcon";
// import MapScreen from "./map";


// export default function TabLayout() {
//     const colorScheme = useColorScheme();
//     const {isSignedIn, role, user} = useAuth()
//     const nav = useNavigation()
//     const {t} = useTranslation()
//
//     useEffect(() => {
//         console.log("isSignedIn", isSignedIn)
//         if (!isSignedIn) {
//             nav.navigate("login")
//         }
//     }, [isSignedIn]);
//
//     const hidden = {
//         tabBarItemStyle: {
//             display: "none"
//         }
//     }
//
//     return (
//
//         <Drawer
//             screenOptions={{
//                 headerShown: true,
//                 headerRight: () => {
//                     return (
//                         <TouchableOpacity className={"mr-2"} onPress={() => nav.navigate("settingsmodal")}>
//                             <Cog/>
//                         </TouchableOpacity>)
//                 }
//             }}>
//
//             <Drawer.Screen name={"login"} options={{
//                 drawerLabel: t("Log in"),
//                 title: t("Log in"),
//                 drawerItemStyle: {
//                     display: isSignedIn ? "none" : "",
//                 },
//                 drawerIcon: ({color, focused}) => (
//                     <User/>
//                 )
//             }}/>
//
//
//             <Drawer.Screen name={"index"} options={{
//                 drawerLabel: t('Home'),
//                 title: t('Home'),
//                 drawerIcon: ({color, focused}) => (
//                     <House/>
//                 ),
//                 drawerItemStyle: {
//                     display: isSignedIn ? "block" : "none"
//                 },
//             }}/>
//
//             <Drawer.Screen name={"tickets"} options={{
//                 drawerLabel: t("Tickets"),
//                 title: t("Tickets"),
//                 drawerItemStyle: {
//                     display: (role === "Service") ? "block" : "none"
//                 },
//                 drawerIcon: ({color, focused}) => (
//                     <Wrench/>
//                 )
//             }}/>
//
//
//             <Drawer.Screen name={"checkin"} options={{
//                 drawerLabel: t("Check-In"),
//                 title: t("Check-In"),
//                 drawerIcon: ({color, focused}) => (
//                     <Download/>
//                 ),
//             }}/>
//
//             <Drawer.Screen name={"manual"} options={{
//                 drawerLabel: t("Manuals"),
//                 title: t("Manuals"),
//                 drawerItemStyle: {
//                     display: (isSignedIn ? (role === "Service") ? "none" : "" : "block")
//                 },
//                 drawerIcon: ({color, focused}) => (
//                     <Download/>
//                 ),
//             }}/>
//
//             <Drawer.Screen name={"checkout"} options={{
//                 drawerLabel: t("Check-Out"),
//                 title: t("Check-Out"),
//                 drawerIcon: ({color, focused}) => (
//                     <Upload/>
//                 ),
//                 drawerItemStyle: {
//                     display: (user.stage === "checked_in") ? "block" : "none"
//                 }
//             }}/>
//
//
//             <Drawer.Screen name={"customerservice"} options={{
//                 drawerLabel: t("Customer Service"),
//                 title: t("Customer Service"),
//                 drawerIcon: ({color, focused}) => (
//                     <CircleHelp/>
//                 )
//             }}/>
//
//
//             <Drawer.Screen name={"checkindone"} options={{drawerItemStyle: {display: "none"}}}/>
//             <Drawer.Screen name={"checkoutdone"} options={{drawerItemStyle: {display: "none"}}}/>
//         </Drawer>
//
//     )
//     // return (
//     //     <Tabs
//     //         screenOptions={{
//     //              headerShown: true, headerRight: () => {
//     //                 return (<TouchableOpacity className={"mr-2"} onPress={() => nav.navigate("settingsmodal")}>
//     //                     <Text className={`${defaultText}`}>See</Text>
//     //                 </TouchableOpacity>)
//     //             }
//     //         }}>
//     //
//     //
//     //         <Tabs.Screen name="index" options={{
//     //             title: 'Home',
//     //             tabBarIcon: ({color, focused}) => (
//     //                 <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
//     //             ),
//     //             tabBarItemStyle: {
//     //                 display: !isSignedIn ? "none" : "",
//     //             },
//     //         }}
//     //         />
//     //         <Tabs.Screen name={"checkin"} options={{...hidden, headerTitle: t("Check-In"), headerShown: true}}/>
//     //         <Tabs.Screen name={"checkout"} options={{...hidden, headerTitle: t("Check-Out"), headerShown: true}}/>
//     //         <Tabs.Screen name={"checkindone"} options={{...hidden, headerTitle: t("Check-In Done"), headerShown: true}}/>
//     //         <Tabs.Screen name={"checkoutdone"} options={{...hidden, headerTitle: t("Check-Out Done"), headerShown: true}}/>
//     //
//     //         <Tabs.Screen name={"login"} options={{
//     //             tabBarItemStyle: {
//     //                 display: isSignedIn ? "none" : "",
//     //             },
//     //             headerTitle: t("Login"),
//     //             headerShown: true
//     //         }}/>
//     //
//     //         <Tabs.Screen name={"tickets"} options={{
//     //             headerTitle: t("Tickets"),
//     //             headerShown: true,
//     //             tabBarItemStyle: {
//     //                 display: isSignedIn
//     //                     ? role !== "Service" ? "none" : ""
//     //                     : "none"
//     //             },
//     //         }}/>
//     //     </Tabs>
//     // )
// }
