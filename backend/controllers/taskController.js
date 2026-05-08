import asyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";


// CREATE TASK
const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const task = await Task.create({
    user: req.user._id,
    title,
    description,
  });

  res.status(201).json(task);
});


// GET TASKS
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({
    user: req.user._id,
  });

  res.json(tasks);
});


// UPDATE TASK
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    task.title = req.body.title || task.title;

    task.description =
      req.body.description || task.description;

    task.completed =
      req.body.completed ?? task.completed;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } else {
    res.status(404);

    throw new Error("Task not found");
  }
});


// DELETE TASK
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    await task.deleteOne();

    res.json({
      message: "Task removed",
    });
  } else {
    res.status(404);

    throw new Error("Task not found");
  }
});

export {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};