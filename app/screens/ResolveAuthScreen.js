import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";

const ResolveAuthScreen = () => {
  const { autoLoginIfExistedToken } = useContext(AuthContext);

  useEffect(() => {
    autoLoginIfExistedToken();
  }, []);

  return (
    <View style={waiting_style.container}>
      <ActivityIndicator />
    </View>
  );
};
const waiting_style = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  // design waiting screen
  waiting_content: {
    alignSelf: "center",
    width: 100,
    height: 100,
  },
});
export default ResolveAuthScreen;
