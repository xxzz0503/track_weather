import React, { useContext, useRef } from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import AuthForm from "../components/AuthForm";
import Spacer from "../components/Spacer";
import NavLink from "../components/NavLink";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";

const SignInScreen = ({ navigation }) => {
  const { doSignIn } = useContext(AuthContext);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const navScale = useRef(new Animated.Value(1)).current;

  const whenBlur = () => {
    Animated.timing(navScale, {
      toValue: 0.5,
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
      <NavigationEvents onWillBlur={whenBlur} onDidFocus={whenFocus} />
      <Animated.View
        style={[styles.container, { transform: [{ scale: navScale }] }]}
      >
        <AuthForm buttonTitle="Sign In" onSubmit={doSignIn} />
        <NavLink routeName="SignUp" textLink="Goto sign up" />
      </Animated.View>
    </SafeAreaView>
  );
};

SignInScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default SignInScreen;
