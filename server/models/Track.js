const MONGOOSE = require("mongoose");

const locationSchema = MONGOOSE.Schema({
  coords: {
    latitude: Number,
    longitude: Number,
  },
});

const trackSchema = MONGOOSE.Schema({
  userId: {
    type: MONGOOSE.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    default: "",
  },
  location: locationSchema,
});

MONGOOSE.model("Track", trackSchema);
