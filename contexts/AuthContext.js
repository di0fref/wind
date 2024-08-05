import React, {createContext, useContext, useEffect, useState} from "react";
import {api} from "../lib/http-common";
import {getSecureData, removeSecureData, setSecureData} from "@/lib/utils";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [token, setToken] = useState("");
    const [role, setRole] = useState("");
    const [stage, setStage] = useState("");
    const [isSelectingRole, setIsSelectingRole] = useState(false)
    const [isSignedIn, setIsSignedIn] = useState(false)

    const setSelectingRole = (val) => {
        setSecureData("selectingRole", val)
        setIsSelectingRole(val)
    }

    const setUserRole = (role) => {
        setSecureData("role", role)
        setRole(role)
    }

    useEffect(() => {

        const get = async () => {
            let token = await getSecureData("token")
            if (token) {
                let selectingRole = await getSecureData("selectingRole")
                setToken(token)
                setIsSignedIn(true)
                if (selectingRole) {
                    await setSelectingRole(selectingRole)
                }
                await me()
            }
        }
        get()

    }, [])

    const me = async (callback) => {

        api.get("/api/me").then((res) => {
            setStage(res.data.stage)
            setUser(res.data)

            if (callback) {
                callback(res.data)
            } else {
                getSecureData("role").then(role => {
                    if (role) {
                        setRole(role)
                    } else {
                        logout();
                    }
                })
            }
        }).catch(err => {
            // console.log(err)
            logout()
        });

        // try {
        //     await api.get("api/me")
        //         .then(res => {
        //             setStage(res.data.stage)
        //             setUser(res.data)
        //
        //             if (callback) {
        //                 callback(res.data)
        //             } else {
        //                 getSecureData("role").then(role => {
        //                     if (role) {
        //                         setRole(role)
        //                     } else {
        //                         logout();
        //                     }
        //                 })
        //             }
        //         }).catch(err => {
        //             logout()
        //         })
        // }catch(err) {}
    }


    const login = async (userData, callback, setLoading) => {
        console.log(JSON.stringify("*****************************", null, 2))
        try {
            await api.post("/api/token", {
                ...userData
            }).then((res) => {
                setSecureData("token", res.data.token)
                setToken(res.data.token)
                setIsSignedIn(true)
                me(callback)
            }).catch(err => {
                alert("These credentials do not match our records")
            }).finally(() => {
                if (typeof setLoading === "function") {
                    setLoading(false)
                }
            })
        } catch (error) {
            console.log("err", JSON.stringify(error.response.data, null, 2))
            alert("Something went wrong, please try again")
        }
    }


    const register = async (userData, setLoading, callback) => {
        try {
            await api.post("/api/register", {
                ...userData
            }).then((res) => {
                console.log(JSON.stringify(res.data, null, 2))
                if (res.data.error) {
                    alert(res.data.error)
                } else {
                    setSecureData("token", res.data.token)
                    setToken(res.data.token)
                    me(callback)
                }
            }).catch(err => {
                // console.log(JSON.stringify(err.data.response, null, 2))
            }).finally(() => {
                if (typeof setLoading === "function") {
                    setLoading(false)
                }

            })
        } catch (error) {
            console.log(error)
            alert("Something went wrong, please try again")
        }
    };

    const removeUser = async () => {
        removeSecureData("token")
        removeSecureData("user")
        removeSecureData("role")
        setStage("")
        setRole("")
        setToken("")
        setUser({})
        setIsSignedIn(false)
        setIsSelectingRole(false)
        setStage("")
    }

    const logout = async (setLoading) => {
        // Detach token in backend
        api.post("api/logout").then(res => {
            removeUser()
        }).catch(err => {
            // console.log(JSON.stringify(err, null, 2))
        })
            .finally(() => {
                if (typeof setLoading === "function") {
                    setLoading(false)
                }
            })

    };

    return (
        <AuthContext.Provider value={{removeUser, user, login, logout, isSignedIn, register, token, me, role, setUserRole, isSelectingRole, setSelectingRole}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
