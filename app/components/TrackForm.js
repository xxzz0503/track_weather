import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { Context as LocationContext } from "../context/LocationContext";

const TrackForm = () => {
  const {
    state: { name },
    changeName,
    startSearch,
  } = useContext(LocationContext);

  return (
    <View style={styles.main_container}>
      <Input
        containerStyle={styles.mc_input_container}
        placeholder="City name or Zip code"
        value={name}
        onChangeText={(text) => changeName(text)}
      />
      <TouchableOpacity
        style={styles.mc_icon_container}
        onPress={() => startSearch(name)}
      >
        <Feather name="search" size={40} color="#2d6187" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  mc_input_container: {
    flex: 6,
    alignSelf: "center",
  },
  mc_icon_container: {
    alignSelf: "center",
    flex: 1,
    marginBottom: 10,
  },
});

export default TrackForm;
