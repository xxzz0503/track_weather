import React from "react";
import { StyleSheet, Animated } from "react-native";

export const toggleEmailLabel = (email, emailAnim, callback) => {
  if (callback) {
    callback();
  }
  if (email !== "") {
    moveLabel(emailAnim);
  } else {
    returnLabel(emailAnim);
  }
};
export const togglePwdLabel = (password, pwdAnim, callback) => {
  if (callback) {
    callback();
  }
  if (password !== "") {
    moveLabel(pwdAnim);
  } else {
    returnLabel(pwdAnim);
  }
};

const moveLabel = (anim) => {
  Animated.timing(anim, {
    toValue: 1,
    duration: 500,
    useNativeDriver: false,
  }).start();
};

const returnLabel = (anim) => {
  Animated.timing(anim, {
    toValue: 0,
    duration: 500,
    useNativeDriver: false,
  }).start();
};

const AuthLabel = ({ reference, label, anim }) => {
  const newLabelStyle = () => {
    return {
      transform: [
        {
          translateX: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [45, 0],
          }),
        },
        {
          translateY: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [15, -20],
          }),
        },
      ],
      fontSize: anim.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 18],
      }),
      color: anim.interpolate({
        inputRange: [0, 1],
        outputRange: ["#111111", "#2d6187"],
      }),
      opacity: anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 1],
      }),
    };
  };
  return (
    <Animated.Text style={[styles.label, newLabelStyle()]}>
      {label}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    fontWeight: "700",
  },
});

export default AuthLabel;
