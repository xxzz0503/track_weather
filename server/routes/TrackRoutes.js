const EXPRESS = require("express");
const MONGOOSE = require("mongoose");

const REQUIRE_AUTH = require("../middleware/requireAuth");

const Track = MONGOOSE.model("Track");

const ROUTER = EXPRESS.Router();

ROUTER.use(REQUIRE_AUTH);

ROUTER.get("/tracks", async (req, res) => {
  let tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});
ROUTER.post("/tracks", async (req, res) => {
  const { name, location } = req.body;

  if (!name || !location) {
    return res
      .status(422)
      .send({ error: "You must provide name and location" });
  }

  try {
    let track = new Track({
      name: name,
      location: location,
      userId: req.user._id,
    });

    await track.save();
    res.send(track);
  } catch (e) {
    res.status(422).send({ error: e.message });
  }
});

module.exports = ROUTER;
