import React, { useContext, useRef } from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import AuthForm from "../components/AuthForm";
import Spacer from "../components/Spacer";
import NavLink from "../components/NavLink";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";

const SignUpScreen = () => {
  const { doSignUp } = useContext(AuthContext);
  const navScale = useRef(new Animated.Value(0.5)).current;

  const whenBlur = () => {
    Animated.timing(navScale, {
      toValue: 0.5,
      duration: 1000,
      easing: Easing.back(),
      useNativeDriver: true,
    }).start();
  };

  const whenFocus = () => {
    Animated.timing(navScale, {
      toValue: 1,
      duration: 500,
      easing: Easing.back(),
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView>
      <NavigationEvents
        onWillBlur={() => console.log(1)}
        onDidFocus={whenFocus}
      />
      <Animated.View
        style={[styles.container, { transform: [{ scale: navScale }] }]}
      >
        <Spacer />
        <AuthForm buttonTitle="Sign Up" onSubmit={doSignUp} />

        <NavLink
          routeName="SignIn"
          textLink="Goto sign in"
        />
      </Animated.View>
    </SafeAreaView>
  );
};

SignUpScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default SignUpScreen;
