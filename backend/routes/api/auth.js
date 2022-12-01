require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const User = require("../../model/User");

// @route    GET api/auth
// @desc     Test route
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    post api/auth
// @desc     authenticate the user
// @access   Public

router.post("/", async (req, res) => {
  // Get user input
  const { email, password } = req.body;

  try {
    // validate the user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    // validate if the user exist in the database
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const payload = {
        user: {
          id: user._id,
        },
      };
      const token = jwt.sign(
        payload,
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      //   // save user token
      //   user.token = token;
      //   user.password = undefined;

      //   // user
      //   res.status(201).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    console.error(error.message);
  }
});
module.exports = router;
