import { TaskFilters, TaskUpdate } from "../types/Tasks.js";
export function prepareTasksQuery(filters: TaskFilters) {
  let query = "SELECT id,title, completed, deadline FROM tasks WHERE 1=1";
  const params: any[] = [];

  if (filters.title) {
    query += " AND title LIKE ?";
    params.push(`%${filters.title}%`);
  }

  if (filters.description) {
    query += " AND description LIKE ?";
    params.push(`%${filters.description}%`);
  }

  if (filters.completed !== undefined) {
    query += " AND completed = ?";
    params.push(filters.completed ? 1 : 0);
  }

  query += " ORDER BY id DESC";
  const limit = filters.limit ?? 10;
  const offset = ((filters.page ?? 1) - 1) * limit;
  query += " LIMIT ? OFFSET ?";
  params.push(limit, offset);

  return { query, params };
}

export function prepareUpdateQuery(task: TaskUpdate, id: string) {
  const fields: string[] = [];
  const params: any[] = [];

  if (task.title !== undefined) {
    fields.push("title = ?");
    params.push(task.title);
  }

  if (task.description !== undefined) {
    fields.push("description = ?");
    params.push(task.description);
  }

  if (task.completed !== undefined) {
    fields.push("completed = ?");
    params.push(task.completed ? 1 : 0);
  }

  if (task.deadline !== undefined) {
    fields.push("deadline = ?");
    params.push(task.deadline);
  }

  if (fields.length === 0) {
    throw new Error("No hay campos para actualizar");
  }

  params.push(id);
  const query = `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`;

  return { query, params };
}
