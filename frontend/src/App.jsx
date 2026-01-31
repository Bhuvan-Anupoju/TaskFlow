import React, { useState, useEffect } from "react";
import axios from "axios";

//Toast Error
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaTrash, FaRegCircle, FaCheckCircle, FaTasks } from "react-icons/fa";

const App = () => {
  // useState hooks
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [color, setColor] = useState("gray");

  // API_URL
  const API_URL = "http://localhost:5000/api/tasks";

  // useEFfect Hook
  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (error) {
      console.error("ERROR fetching tasks: ", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  // colors
  const colorStyles = {
    red: {
      text: "text-red-400",
      border: "border-red-400",
    },
    blue: {
      text: "text-blue-400",
      border: "border-blue-500",
    },
    green: {
      text: "text-green-400",
      border: "border-green-400",
    },
    yellow: {
      text: "text-yellow-400",
      border: "border-yellow-400",
    },
    pink: {
      text: "text-pink-500",
      border: "border-pink-500",
    },
    gray: {
      text: "text-gray-300",
      border: "border-gray-300",
    },
  };
  //console.log(tasks);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!task) {
        toast.error("You must write a task!", {
          style: {
            background: "#030712",
            color: "tomato",
            fontSize: "16px",
            borderRadius: "8px",
          },
        });
        return;
      }

      await axios.post(API_URL, {
        task: task,
        color: color,
        taskDone: false,
      });

      setTask("");
      setColor("gray");
      fetchTasks();
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  // handle delete
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure?")) {
        await axios.delete(`${API_URL}/${id}`);
        fetchTasks();
      }
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  // handle isDone
  const markAsDone = async (task) => {
    try {
      await axios.put(`${API_URL}/${task._id}`, {
        taskDone: !task.taskDone,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  // handle delete all tasks
  const clearAll = async () => {
    try {
      if (window.confirm("Are you sure you want to clear all tasks")) {
        await axios.delete(API_URL);
        fetchTasks();
      }
    } catch (error) {
      console.error("Failed to delete all tasks", error);
    }
  };

  return (
    <div className="py-50 px-10 min-h-screen w-full bg-gray-900 flex items-center justify-center text-white">
      <div className="w-250">
        {/* header*/}
        <div className="bg-gray-800 w-full h-fit p-5 rounded-xl flex items-center justify-between gap-5">
          {/* Left*/}
          <div>
            <h1 className="text-3xl mb-2">Task Flow</h1>
            <p className="text-sm text-zinc-400">
              Use this app to remember whatever you want to do
            </p>
          </div>
          {/* Right */}
          <div className="text-5xl text-gray-400">
            <FaTasks />
          </div>
        </div>
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 flex justify-between gap-5 rounded-xl mt-3 w-full  py-3 px-3"
        >
          <input
            type="text"
            placeholder="write your task here..."
            className="px-3 py-2 bg-gray-800 w-full rounded-md outline-0"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          {/* colors*/}

          <div className="flex items-center gap-4">
            {/* RED */}
            <label className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value="red"
                checked={color === "red"}
                onChange={(e) => setColor(e.target.value)}
                className="hidden"
              />
              <span
                className={`w-6 h-6 rounded-full bg-red-500 block ${color === "red" ? "border-2 border-white" : "border-2 border-transparent"}`}
              ></span>
            </label>
            {/* Blue */}
            <label className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value="blue"
                checked={color === "blue"}
                onChange={(e) => setColor(e.target.value)}
                className="hidden"
              />
              <span
                className={`w-6 h-6 rounded-full bg-blue-500 block ${color === "blue" ? "border-2 border-white" : "border-2 border-transparent"}`}
              ></span>
            </label>
            {/* GREEN */}
            <label className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value="green"
                checked={color === "green"}
                onChange={(e) => setColor(e.target.value)}
                className="hidden"
              />
              <span
                className={`w-6 h-6 rounded-full bg-green-400 block ${color === "green" ? "border-2 border-white" : "border-2 border-transparent"}`}
              ></span>
            </label>
            {/* Yellow */}
            <label className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value="yellow"
                checked={color === "yellow"}
                onChange={(e) => setColor(e.target.value)}
                className="hidden"
              />
              <span
                className={`w-6 h-6 rounded-full bg-yellow-500 block ${color === "yellow" ? "border-2 border-white" : "border-2 border-transparent"}`}
              ></span>
            </label>
            {/* Pink */}
            <label className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value="pink"
                checked={color === "pink"}
                onChange={(e) => setColor(e.target.value)}
                className="hidden"
              />
              <span
                className={`w-6 h-6 rounded-full bg-pink-500 block ${color === "pink" ? "border-2 border-white" : "border-2 border-transparent"}`}
              ></span>
            </label>
            {/* Gray */}
            <label className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value="gray"
                checked={color === "gray"}
                onChange={(e) => setColor(e.target.value)}
                className="hidden"
              />
              <span
                className={`w-6 h-6 rounded-full bg-gray-300 block ${color === "gray" ? "border-2 border-white" : "border-2 border-transparent"}`}
              ></span>
            </label>
          </div>
          <button className="bg-orange-500 hover:bg-700 px-3 py-2 rounded cursor pointer font-bold">
            Add
          </button>
        </form>
        {/* Tasks */}
        <ul className="flex flex-col gap-2 w-full mt-3">
          {tasks
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((task) => {
              return (
                <li
                  key={task._id}
                  className="w-full bg-gray-950 px-6 py-5 rounded-xl flex justify-between"
                >
                  {/* content */}
                  <div
                    className={`border-l-5 ${colorStyles[task.color].border} pl-3 rounded-md`}
                  >
                    <p
                      className={`text-xl mb-1 ${task.taskDone ? "line-through" : ""} text-gray-400`}
                    >
                      {task.task}
                    </p>
                    <span className=" text-sm text-zinc-400">created on</span>{" "}
                    <span
                      className={`text-sm ${colorStyles[task.color].text} font-bold`}
                    >
                      {new Date(task.createdAt).toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </span>{" "}
                    <span className={`text-sm ${colorStyles[task.color].text}`}>
                      {new Date(task.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      {new Date(task.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div>
                    {/* buttons*/}
                    <div className="flex items-center gap-3">
                      <button
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(task._id)}
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="text-gray-400 cursor-pointer text-lg"
                        onClick={() => markAsDone(task)}
                      >
                        {!task.taskDone ? <FaRegCircle /> : <FaCheckCircle />}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
        {/* Clear all tasks */}
        {tasks.length > 0 && (
          <button
            className="bg-gray-700 w-full mt-2 py-3 px-5 rounded-xl cursor-pointer hover:bg-gray-800"
            onClick={clearAll}
          >
            Clear All
          </button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
