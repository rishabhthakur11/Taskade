const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Tag = require("../../model/Tag");

// @route    GET api/tags
// @desc     Get all tags
// @access   Private

router.get("/", auth, async (req, res) => {
  try {
    const tag = await Tag.findById(req.id);
    res.json(tag);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
