import { StarRating } from "@/components/star-rating";
import {useEffect, useRef, useState} from "react";
import { View, Text } from "react-native";
import tailwind from "twrnc";
import {Star} from "lucide-react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {t} from "i18next";

export const Rating = ({setRating}) => {
    const [starRating, setStarRating] = useState(0);

    useEffect(() => {
        setRating(starRating)
    }, [starRating]);

    return (
        <View style={tailwind`w-full`}>
            <StarRating
                scale={5}
                starRating={starRating}
                onChange={setStarRating}
                customLabel={() => (<Text className={"font-bold"}>{t("Tap to rate!")}</Text>)}
                showLabel={true}
                customIcon={(isSelected) => (
                    <MaterialIcons
                        name={"star"}
                        size={40}
                        style={
                            isSelected
                                ? [tailwind`text-yellow-400`]
                                : [tailwind`text-neutral-400`]
                        }
                    />
                )}
            />
        </View>
    );
};
