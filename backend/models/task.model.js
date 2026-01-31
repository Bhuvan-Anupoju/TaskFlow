const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    task: {
      type: String,
      require: [true, "This field is required"],
    },
    taskDone: {
      type: Boolean,
      require: true,
    },
    color: {
      type: String,
      enum: ["red", "blue", "green", "yellow", "pink", "gray"],
      default: "gray",
    },
  },
  {
    timestamps: true,
  },
);
const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
