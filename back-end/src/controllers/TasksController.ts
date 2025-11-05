import { Request, Response } from "express";
import { TaskFilters, Task, TaskUpdate } from "../types/Tasks.js";
import taskModel from "../models/tasksModel.js";
import { sendSuccess, sendError } from "../utils/response.js";

function GetTasks(req: Request, res: Response) {
  const filters = req.query as TaskFilters;

  try {
    const lista = taskModel.ListTask(filters);
    return sendSuccess(res, lista, "Lista de tareas", 200);
  } catch (e) {
    return sendError(res, e, "Error en listar tarea");
  }
}

function CreateTask(req: Request, res: Response) {
  const task = req.body as Task;

  console.log(task);
  try {
    const newTask = taskModel.CreateTask(task);

    return sendSuccess(res, newTask, "Tarea creada correctamente", 201);
  } catch (e) {
    return sendError(res, e, "Error al crear la tarea");
  }
}

function updateTask(req: Request, res: Response) {
  const task = req.body as TaskUpdate;
  const id = req.params.id as string;
  try {
    const updateTask = taskModel.updateTask(task, id);
    return sendSuccess(res, updateTask, "Tarea actualizada correctamente");
  } catch (e) {
    return sendError(res, e, "error al actualizar una tarea");
  }
}

function deleteTask(req: Request, res: Response) {
  const id = req.params.id as string;

  try {
    const delTaks = taskModel.deleteTask(id);
    return sendSuccess(res, delTaks);
  } catch (e) {
    return sendError(res, e);
  }
}

function GetTaskByID(req: Request, res: Response) {
  const id = req.params.id as string;
  try {
    const task = taskModel.GetTaskByID(id);
    return sendSuccess(res, task);
  } catch (e) {
    return sendError(res, e);
  }
}

export default { GetTasks, updateTask, deleteTask, CreateTask, GetTaskByID };
