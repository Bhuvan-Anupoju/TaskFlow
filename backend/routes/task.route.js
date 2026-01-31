const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
} = require("../controllers/task.controller");

//Get all tasks
router.get("/", getAllTasks);

// Get a single task
router.get("/:id", getSingleTask);

// Create a new task
router.post("/", createTask);

// Update a task
router.put("/:id", updateTask);

// Delete a task
router.delete("/:id", deleteTask);

// Delete all tasks
router.delete("/", deleteAllTasks);

module.exports = router;
