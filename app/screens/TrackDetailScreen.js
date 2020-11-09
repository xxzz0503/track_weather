import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";

const TrackDetailScreen = () => {
  return <Text h2>Track detail screen</Text>;
};

const styles = StyleSheet.create({});

TrackDetailScreen.navigationOptions = ({ navigation }) => ({
  headerShown: false,
  tabBarIcon: ({ tintColor }) => {
    console.log(navigation);
  },
});

export default TrackDetailScreen;
