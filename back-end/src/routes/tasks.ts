import express from "express";
import TasksController from "../controllers/TasksController.js";
const Tasks = express.Router();

Tasks.get("/", TasksController.GetTasks);
Tasks.get("/:id", TasksController.GetTaskByID);
Tasks.post("/", TasksController.CreateTask);
Tasks.put("/:id", TasksController.updateTask);
Tasks.delete("/:id", TasksController.deleteTask);

export default Tasks;
