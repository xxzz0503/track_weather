import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, Image } from "react-native";
import MapView from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  const {
    state: { data },
  } = useContext(LocationContext);
  let icon;
  if (!data) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  } else {
    icon = data.weather[0].icon;
  }
  console.log(data);
  return (
    <MapView
      initialRegion={{
        latitude: data.coord.lat,
        longitude: data.coord.lon,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      style={styles.container}
    >
      <MapView.Marker
        coordinate={{
          latitude: data.coord.lat,
          longitude: data.coord.lon,
        }}
      >
        <Image
          source={{ uri: "http://openweathermap.org/img/wn/"+icon+"@4x.png" }}
          style={{ height: 100, width: 100 }}
        />
      </MapView.Marker>
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
});

export default Map;
