const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Todo = require("../../model/Todo");
const User = require("../../model/User");

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
  // getting user input
  const { title, tasks } = req.body;
  // Validate user input
  if (!(title && tasks)) {
    res.status(400).send("All input is required");
  }
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newTodo = new Todo({
      title,
      tasks: tasks,
      user: user.id,
    });
    const todo = await newTodo.save();
    res.json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/todos/:id
// @desc     Update a todo
// @access   Private

router.put("/:id", async (req, res) => {
  const { title, tasks } = req.body;

  // validation
  if (!(title && tasks)) {
    res.status(400).send("All input is required");
  }
  try {
    const todo = await Todo.findById(req.params.id);
    // Check for ObjectId format and todo
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    if (todo) {
      todo.title = title;
      todo.tasks = tasks;
    }
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/todos/:id
// @desc     delete a todo
// @access   Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    // Check for ObjectId format and todo
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    // Check user if the todo belongs to authenticated user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await todo.remove();
    res.json({ msg: "Todo removed" });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route    PUT api/todos/complete/:id
// @desc     Complete a todo
// @access   Private

router.put("/complete/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    // Check for ObjectId format and todo
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    // Check user if the todo belongs to authenticated user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    //Check if the todo has already been completed
    if (todo) {
      todo.isCompleted = !todo.isCompleted;
    }
    await todo.save();

    res.json(todo.isCompleted);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
