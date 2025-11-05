import getDB from "../db/db.js";
import { TaskFilters, Task, TaskUpdate } from "../types/Tasks.js";
import {
  prepareTasksQuery,
  prepareUpdateQuery,
} from "../utils/prepareQuery.js";

function ListTask(filters: TaskFilters) {
  try {
    const db = getDB();
    const { query, params } = prepareTasksQuery(filters);
    const stmt = db.prepare(query);
    const tasks = stmt.all(...params);
    return tasks;
  } catch (e) {
    console.log("Error en listar tareas: ", e);
    throw e;
  }
}

function GetTaskByID(id: string) {
  try {
    const db = getDB();
    const query = "SELECT * FROM tasks WHERE id = ?";
    const stmt = db.prepare(query);
    const task = stmt.get(id);

    return task;
  } catch (e) {
    console.log("Error al obtener una tarea mediante id: ", e);
    throw e;
  }
}

function CreateTask(task: Task) {
  try {
    const db = getDB();
    const query =
      "INSERT INTO tasks (title, description,completed) values (?,?,?)";
    const stmt = db.prepare(query);
    const info = stmt.run(task.title, task.description, task.completed || 0);
    return {
      id: info.lastInsertRowid,
    };
  } catch (e) {
    console.log("Error al crear una tarea", e);
    throw e;
  }
}

function updateTask(task: TaskUpdate, id: string) {
  try {
    const db = getDB();
    const { query, params } = prepareUpdateQuery(task, id);
    const stmt = db.prepare(query);
    const info = stmt.run(...params);

    return {
      changes: info.changes,
    };
  } catch (e) {
    console.log("Error al actualizar la tarea", e);
    throw e;
  }
}

function deleteTask(id: string) {
  try {
    const db = getDB();
    const query = "DELETE FROM tasks WHERE id = ?";
    const stmt = db.prepare(query);
    const info = stmt.run(id);
    return {
      changes: info.changes,
    };
  } catch (e) {
    console.log("Error al eliminar tarea: ", e);
    throw e;
  }
}

export default { ListTask, updateTask, CreateTask, deleteTask, GetTaskByID };
