import { useState } from "react";
import {
  TextInput as DefaultTextInput,
  Platform,
  TextInputProps,
} from "react-native";
import tailwind from "twrnc";

/**
 * React Native text input component built with Tailwind CSS
 */
export const TextInput = ({
  placeholderTextColor,
  ...props
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleEndEditing = () => {
    setIsFocused(false);
  };

  return (
    <DefaultTextInput
      {...props}
      onFocus={handleFocus}
      onEndEditing={handleEndEditing}
      style={[
        tailwind`p-2.5 bg-gray-50 border border-gray-300 text-gray-900 _text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`,
        isFocused && Platform.OS !== "web" ? tailwind`border-blue-500` : {},
        props.style,
      ]}
      placeholderTextColor={
        placeholderTextColor || tailwind.color("text-neutral-400")
      }
    />
  );
};
