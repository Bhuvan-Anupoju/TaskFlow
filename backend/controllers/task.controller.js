const Task = require("../models/task.model");

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single task
const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);

    if (!task) {
      return res.status(404).json({ message: "Task Not found" });
    }
    const updatedTask = await Task.findById(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
};

// Delete all tasks
const deleteAllTasks = async (req, res) => {
  try {
    await Task.deleteMany({});
    res.status(200).json({ message: "All tasks deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
};
