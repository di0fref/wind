import {TouchableOpacity, View, Text} from "react-native";
import {useEffect, useState} from "react";
import i18n from "i18next";
import CountryFlag from "react-native-country-flag";
import {getSecureData, setSecureData} from "@/lib/utils";
import {useTheme} from "@react-navigation/native";



const languages = [
    {label: 'English', value: 'en', flag: "gb"},
    {label: 'Svenska', value: 'se', flag: "se"},
];

const LanguageItem = ({item}) => {

    const theme = useTheme()
    const onClick = () => {
        i18n.changeLanguage(item.value)
        setSecureData("lang", item.value)
    }

    useEffect(() => {
        // console.log(JSON.stringify(getSecureData("lang"), null, 2))
    }, []);

    return (
        <TouchableOpacity onPress={onClick}

                          style={{
                              // borderColor:theme.colors.elevation.level4,
                              borderWidth: 1,
                              borderRadius: 20,
                              display:"flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom: 10,
                              paddingVertical: 10,
                              paddingHorizontal: 20,
                              opacity: (i18n.language === item.value)?"":0.4,
                          }}
                          >
            <Text style={{
                fontWeight: (i18n.language === item.value)?"bold":"",
            }}>
                {item.label}
            </Text>
            <CountryFlag isoCode={item.flag} size={20}/>
        </TouchableOpacity>
    )
}

const LanguageSelector = () => {

    return (
        <View>
            {languages.map(item => <LanguageItem key={item.value} item={item}/>)}
        </View>
    )
}

export default LanguageSelector
