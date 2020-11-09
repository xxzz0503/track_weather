import axios from "axios";

export default axios.create({
  baseURL: "http://api.openweathermap.org/data/2.5/weather",
  params: {
    appid: "de62957b67a9bfd24750184f9093393e",
    units: "metric",
  },
});
