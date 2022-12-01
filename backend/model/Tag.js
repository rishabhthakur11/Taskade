const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = Tag = mongoose.model("tag", TagSchema);
