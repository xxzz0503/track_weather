import React, { useState, useContext, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import AuthLabel, { toggleEmailLabel, togglePwdLabel } from "./AuthLabel";
import Error, { toggleErrorMessage } from "./Error";

import { Context as AuthContext } from "../context/AuthContext";
import { Entypo, Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-community/masked-view";

const AuthForm = ({ buttonTitle, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailBoxRef = useRef(null);
  const pwdBoxRef = useRef(null);
  const emailAnim = useRef(new Animated.Value(0)).current;
  const pwdAnim = useRef(new Animated.Value(0)).current;

  const errorAnim = useRef(new Animated.Value(0)).current;

  const {
    state: { errorMessage },
  } = useContext(AuthContext);

  const toggleEmail = useCallback(
    (email) => {
      toggleEmailLabel(email, emailAnim, () => setEmail(email));
    },
    [email]
  );

  const togglePwd = useCallback(
    (password) => {
      togglePwdLabel(password, pwdAnim, () => setPassword(password));
    },
    [password]
  );

  const toggleError = useCallback(() => {
    toggleErrorMessage(errorAnim);
  }, [errorMessage]);

  return (
    <View style={styles.auth_container}>
      <Text h1 style={styles.title}>
        Weather
      </Text>
      <Spacer />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <TouchableWithoutFeedback
          style={styles.form_section}
          onPress={() => {
            emailBoxRef.current.focus();
          }}
        >
          <View>
            <Input
              ref={emailBoxRef}
              leftIcon={<Entypo name="mail" size={24} color="#2d6187" />}
              inputStyle={{ paddingLeft: 8 }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={(text) => {
                toggleEmail(text);
              }}
            />
            <AuthLabel reference={emailBoxRef} label="Email" anim={emailAnim} />
            <Error anim={errorAnim} />
          </View>
        </TouchableWithoutFeedback>
        <Spacer />
        <TouchableWithoutFeedback
          style={styles.form_section}
          onPress={() => {
            pwdBoxRef.current.focus();
          }}
        >
          <View>
            <Input
              ref={pwdBoxRef}
              leftIcon={<Entypo name="lock" size={24} color="#2d6187" />}
              secureTextEntry
              inputStyle={{ paddingLeft: 8 }}
              keyboardType="visible-password"
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={(text) => {
                togglePwd(text);
              }}
            />
            <AuthLabel label="Password" anim={pwdAnim} />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.cc_container}>
          <Button
            type="outline"
            title={buttonTitle}
            containerStyle={styles.cc_btn_container}
            buttonStyle={styles.cc_bc_button}
            titleStyle={styles.cc_bc_title}
            onPress={() => {
              onSubmit(email, password);
              toggleError();
            }}
          />
          {buttonTitle === "Sign In" ? (
            <MaskedView
              style={{ flex: 1, height: "100%" }}
              maskElement={
                <TouchableWithoutFeedback
                  style={{
                    // Transparent background because mask is based off alpha channel.
                    backgroundColor: "transparent",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Ionicons style={styles.cc_bc_icon} name="ios-finger-print" />
                </TouchableWithoutFeedback>
              }
            >
              {/* Shows behind the mask, you can put anything here, such as an image */}
              <View
                style={{ flex: 2, height: "100%", backgroundColor: "#2d6187" }}
              />
              <View
                style={{ flex: 1, height: "100%", backgroundColor: "#925164" }}
              />
            </MaskedView>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  auth_container: {
    alignSelf: "center",
    width: "90%",
    flex: 3,
  },
  title: {
    fontWeight: "800",
    color: "#2d6187",
    alignSelf: "center",
  },
  form_section: {
    justifyContent: "center",
  },
  cc_container: {
    flexDirection: "row",
  },
  cc_btn_container: {
    flex: 5,
  },
  cc_bc_button: {
    borderWidth: 2,
    borderRadius: 5,
    width: "90%",
    marginLeft: 10,
    borderColor: "#2d6187",
  },
  cc_bc_title: {
    color: "#2d6187",
    fontSize: 20,
    fontWeight: "700",
  },
  cc_bc_icon: {
    fontSize: 50,
    color: "#111111",
    marginRight: 10,
  },
});

export default AuthForm;
