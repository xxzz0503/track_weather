const EXPRESS = require("express");
const MONGOOSE = require("mongoose");
const ROUTER = EXPRESS.Router();
const JWT = require("jsonwebtoken");
const User = MONGOOSE.model("User");

ROUTER.post("/SignUp", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    // create token with secret key and send back to user
    const token = JWT.sign({ userId: user._id }, "MY_KEY");
    res.send({ token: token });
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

ROUTER.post("/SignIn", async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(422).send({error: "Must provide email and password"});
    }

    const user = await User.findOne({email: email});
    if (!user) {
        return res.status(404).send({error: "Email not found"});
    }

    try {
        await user.comparePassword(password);
        const token = JWT.sign({ userId: user._id }, "MY_KEY");
        res.send({token: token});
    } catch(e) {
        return res.status(422).send({error: "Invalid password or email"});
    }
})

module.exports = ROUTER;
