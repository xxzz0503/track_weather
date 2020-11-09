import React from "react";
import { StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-navigation";
import { FlatListSlider } from "react-native-flatlist-slider";

const TrackListScreen = ({ navigation }) => {
  const images = [
    {
      image:
        "https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
      desc: "Silent Waters in the mountains in midst of Himilayas",
    },
    {
      image:
        "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
      desc:
        "Red fort in India New Delhi is a magnificient masterpeiece of humans",
    },
  ];

  return (
    <SafeAreaView>
      <Text h2>Track list screen</Text>
      <FlatListSlider
        data={images}
        height={240}
        timer={5000}
        onPress={(item) => alert(JSON.stringify(item))}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        indicatorContainerStyle={{ position: "absolute", bottom: 20 }}
        indicatorActiveColor={"#8e44ad"}
        indicatorInActiveColor={"#ffffff"}
        indicatorActiveWidth={30}
        animation
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

TrackListScreen.navigationOptions = {
  headerShown: false,
};
export default TrackListScreen;
