const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  title: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Class", classSchema);