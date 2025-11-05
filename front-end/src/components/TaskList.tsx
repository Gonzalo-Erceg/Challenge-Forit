import { useState, useEffect } from "react";
import type { Task } from "../types/Task";
import Trash from "./icons/Trash";
import Edit from "./icons/Edit";
import CheckBox from "./CheckBox";
import { Link } from "@tanstack/react-router";
interface ITaskListProps {
  items: Task[];
}

export default function TaskList(props: ITaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    setTasks(props.items);
  }, [props.items]);
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: "DELETE",
      });
      const response = await res.json();
      console.log(response);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      console.log("Error:", e);
    }
  };
  const handleChecked = async (id: number, value: boolean) => {
    try {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: value ? 1 : 0 } : task
        )
      );
      const res = await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          completed: value ? true : false,
        }),
      });
      const response = await res.json();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return tasks.length > 0 ? (
    <ul>
      {tasks.map((item) => (
        <>
          <li className="flex justify-between">
            <CheckBox
              checked={item.completed}
              onChange={(e) => {
                handleChecked(item.id, e.target.checked);
              }}
            />
            <Link to="/TaskItem/$id" params={{ id: item.id.toString() }}>
              {item.title}
            </Link>
            <div className="flex gap-4">
              <Link
                to="/TaskItem/TaskItemEdit/$id"
                params={{ id: item.id.toString() }}
                className="cursor-pointer hover:[&_svg]:stroke-(--primary)"
              >
                <Edit />
              </Link>
              <button
                className="cursor-pointer hover:[&_svg]:stroke-(--primary)"
                onClick={() => handleDelete(item.id)}
              >
                <Trash />
              </button>
            </div>
          </li>
          <hr className="my-4"></hr>
        </>
      ))}
    </ul>
  ) : (
    <h1>No hay tareas</h1>
  );
}
