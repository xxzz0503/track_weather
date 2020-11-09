import React, { useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-navigation";
import Map from "../components/Map";
import TrackForm from "../components/TrackForm";
import { Context as LocationContext } from "../context/LocationContext";
const TrackCreateScreen = () => {
  const { startSearch } = useContext(LocationContext);

  // useEffect(() => {
  //   startSearch();
  // }, []);
  return (
    <SafeAreaView>
      <Text h2>Track create screen</Text>
      <Map />
      <TrackForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

TrackCreateScreen.navigationOptions = {
  tabBarLabel: () => {
    return null;
  },
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome name="plus" size={30} color={tintColor} />
  ),
};
export default TrackCreateScreen;
