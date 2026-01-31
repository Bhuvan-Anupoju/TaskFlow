const express = require("express");
const Task = require("./models/task.model");
const taskRoute = require("./routes/task.route");
const connectDB = require("./db/db");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

// TasksRoute
app.use("/api/tasks", taskRoute);

// Database and Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
