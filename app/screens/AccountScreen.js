import React, { useContext } from "react";

import { StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import Spacer from "../components/Spacer";

import { Context as AuthContext } from "../context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AccountScreen = () => {
  const { doSignOut } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <Spacer>
        <Text h2>Account screen</Text>
        <Button raised title="Sign Out" onPress={doSignOut} />
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

AccountScreen.navigationOptions = {
  tabBarLabel: () => {
    return null;
  },
  tabBarIcon: ({ tintColor }) => (
    <MaterialCommunityIcons name="account" size={30} color={tintColor} />
  ),
};

export default AccountScreen;
