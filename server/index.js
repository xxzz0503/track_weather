require("./models/User");
require("./models/Track");
const EXPRESS = require("express");
const APP = EXPRESS();
const BODY_PARSER = require("body-parser");
const MONGOOSE = require("./db/MongooseFactory");
const AUTH_ROUTES = require("./routes/AuthRoutes");
const TRACK_ROUTES = require("./routes/TrackRoutes");
const REQUIRE_AUTH = require("./middleware/requireAuth");

MONGOOSE.connection();

APP.use(BODY_PARSER.json());
APP.use(AUTH_ROUTES);
APP.use(TRACK_ROUTES);

APP.get("/", REQUIRE_AUTH, (req, res) => {
  res.send(`Info: ${req.user}`);
});

APP.listen(3000, () => {
  console.log("Server is run on port 3000");
});
