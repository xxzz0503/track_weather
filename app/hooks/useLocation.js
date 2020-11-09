import React, { useState, useEffect } from "react";
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from "expo-location";

export default () => {
  const [error, setError] = useState("");

  useEffect(()=>{
      let subscriber;
      const startWatching = async () => {
          try {
              subscriber = await watchPositionAsync()
          }
      }
  },[])
};
