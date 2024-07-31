import {useEffect, useState} from "react";
import {Text, View} from "react-native";
import tw from "twrnc";
import {capitalize} from "../lib/utils";

const getColor = (text) => {
    switch (text) {
        case "new":
            return "red"
        case "closed":
            return "green"
        case "assigned":
            return "yellow"
        default:
            return "blue"
    }
}

export default function Chip({text}) {

    const [color, setColor] = useState(getColor(text))
    useEffect(() => {
        setColor(getColor(text))
    }, [text]);

    return (
        <View style={tw`relative items-center rounded-md bg-${color}-500 py-0.5 px-1 `}>
            <Text className="text-white text-xs font-sans font-bold_ whitespace-nowrap">{capitalize(text)}</Text>
        </View>
    )
}
