require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/User");

// @route    POST api/users
// @desc     Register user
// @access   Public

router.post("/", async (req, res) => {
  // Getting user input
  const { name, email, password } = req.body;
  // Validate user input
  if (!(email && password && name)) {
    res.status(400).send("All input is required");
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    user = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = {
      user: {
        id: user._id,
      },
    };
    jwt.sign(
      payload,
      process.env.TOKEN_KEY,
      { expiresIn: 144000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
