import {useEffect, useState} from "react";
import {Text, View} from "react-native";
import tw from "twrnc";
import {capitalize} from "../lib/utils";
import {useTranslation} from "react-i18next";

const getColor = (text) => {
    switch (text) {
        case "new":
            return "red"
        case "closed":
            return "green"
        case "assigned":
            return "yellow"
        case "pending_third_party":
            return "orange"
        default:
            return "blue"
    }
}

export default function Chip({text}) {

    const {t} = useTranslation();

    const [color, setColor] = useState(getColor(text))
    useEffect(() => {
        setColor(getColor(text))
    }, [text]);

    return (
        <View style={tw`relative items-center rounded-2xl bg-${color}-600 py-1 px-3 `}>
            <Text className="text-white text-xs font-sans font-bold whitespace-nowrap">{t(capitalize(text))}</Text>
        </View>
    )
}
