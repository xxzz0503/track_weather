import React, { useContext, useRef } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";

const NavLink = ({ navigation, routeName, textLink }) => {
  const { clearErrorMsg } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.nav_button}
        onPress={() => {
          clearErrorMsg();
          navigation.navigate(routeName);
        }}
      >
        <Text style={styles.nav_title}>{textLink}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginVertical: 10,
  },
  nav_button: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  nav_title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2d6187",
    textDecorationLine: "underline"
  },
});

export default withNavigation(NavLink);
