const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Todo = require("../../model/Todo");
const User = require("../../model/User");
const Tag = require("../../model/Tag");

// @route    GET api/todos
// @desc     Get all todos
// @access   Private

router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({
      user: req.user.id,
    }).sort({ date: -1 });
    res.json(todos);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

// @route    POST api/todos
// @desc     Create a todo
// @access   Private

router.post("/", auth, async (req, res) => {
  // Getting user input
  const { text, tagId } = req.body;
  // validating the user
  if (!(text && tagId)) {
    res.status(400).send("All inputs are required");
  }
  try {
    const user = await User.findById(req.user.id).select("-password");
    const tag = await Tag.findById(req.body.tagId);
    let createdTag = {};
    if (tag === null) {
      const newTag = new Tag({
        name: req.body.tagId,
      });
      createdTag = await newTag.save();
    }
    const newTodo = new Todo({
      name: user.name,
      tags: tag == null ? [createdTag] : [tag],
      text: req.body.text,
      user: req.user.id,
    });
    const todo = await newTodo.save();
    res.json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
