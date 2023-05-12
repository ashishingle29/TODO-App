const mongoose = require("mongoose");

module.exports = mongoose.model(
  "task",

  new mongoose.Schema(
    {
      category: {
        type: String,
        enum: ['All', 'Completed', 'Uncompleted'],
        default: "Uncompleted"
      },
      title: String,
      content: String,
      userid: String
    },
    { timestamps: true }
  )
);
