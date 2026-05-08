import express from "express";

const router = express.Router();

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";


// CREATE + GET TASKS
router
  .route("/")
  .post(protect, createTask)
  .get(protect, getTasks);


// UPDATE + DELETE TASK
router
  .route("/:id")
  .put(protect, updateTask)
  .delete(protect, deleteTask);


export default router;