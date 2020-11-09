const JWT = require("jsonwebtoken");
const MONGOOSE = require("mongoose");
const User = MONGOOSE.model("User");

module.exports = (req, res, next) => {
  // If we determine that a user have a JWT
  // call callback (next) function

  // auto lowercase any header name in return request object
  // so must be destructor object with lowercase key name.
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in!!" });
  }
  // authorization === Bearer token
  // So we need a token only
  const token = authorization.replace("Bearer ", "");

  JWT.verify(token, "MY_KEY", async (e, payload) => {
    if (e) {
      return res.status(401).send({ error: "You must be logged in!!" });
    }

    // payload is a value return after encode token
    // it user info so get userId by destructor it
    const { userId } = payload;

    // find user from mongoDb collection based on userId
    // return an object
    const user = await User.findById(userId);

    // attach that object data to req
    req.user = user;

    next();

  });
};
