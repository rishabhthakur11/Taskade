const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title of todo is required"],
      maxLength: [30, "Maximum length of title is 30 charecters"],
    },
    tasks: {
      type: [
        {
          type: String,
        },
      ],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User Id is required to create a todo"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Todo = mongoose.model("todo", TodoSchema);
