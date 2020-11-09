import React, { useContext } from "react";
import { StyleSheet, Animated, Easing, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Context as AuthContext } from "../context/AuthContext";

export const toggleErrorMessage = (anim) => {
  Animated.timing(anim, {
    toValue: 1,
    duration: 1000,
    easing: Easing.bounce,
    useNativeDriver: false,
  }).start();
};

const ErrorMsg = ({ anim }) => {
  const {
    state: { errorMessage },
  } = useContext(AuthContext);

  const newErrorStyle = () => {
    return {
      opacity: anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };
  };

  return errorMessage ? (
    <TouchableOpacity
      style={styles.display}
      onPress={() => alert(errorMessage)}
    >
      <Animated.View style={newErrorStyle()}>
        <AntDesign style={styles.content} name="closecircle" />
      </Animated.View>
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  display: {
    position: "absolute",
    alignSelf: "flex-end",
    right: 10,
    top: 20,
    opacity: 0.7,
  },
  content: {
    color: "red",
    fontSize: 24,
  },
});

export default ErrorMsg;
