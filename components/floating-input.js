import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TextInput, View} from 'react-native';

const AnimatedInputField = ({label}) => {

    const [isFocused, setIsFocused] = useState(false);

    const [text, setText] = useState('');
    const floatingLabelAnimation = useRef(
        new Animated.Value(text ? 1 : 0),
    ).current;

    const styles = StyleSheet.create({
        container: {
            marginTop: 30,
            marginHorizontal: 10,
            backgroundColor: "rgb(249 250 251)",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: !isFocused?"rgb(156 163 175)":"blue"
        },
        input: {

            // borderBottomWidth: 1,
            // borderColor: '#000',
            padding: 10,
            fontSize: 16
            // fontWeight: 'bold',
        },
        label: {
            paddingLeft: 10,
            position: 'absolute',
            color: !isFocused? 'darkgray': "black"
        },
    });

    const handleFocus = () => {
        // Animate the label up and reduce its size when input is focus
        setIsFocused(true)
        Animated.timing(floatingLabelAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        // If the input is empty, animate the floating label back to its original position
        if (!text) {
            setIsFocused(false)
            Animated.timing(floatingLabelAnimation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
    };

    // Define animated styles for the floating label
    const floatingLabelStyle = {
        top: floatingLabelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [10, -20], // top value
        }),
        fontSize: floatingLabelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 14], // font size
        }),
    };

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.label, floatingLabelStyle]}>
                {label}
            </Animated.Text>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={val => setText(val)}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </View>
    );
};



export default AnimatedInputField;
