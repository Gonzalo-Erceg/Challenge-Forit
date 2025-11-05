import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import ArrowLeft from "../components/icons/ArrowLeft";

export const Route = createFileRoute("/TaskForm")({
  component: TaskForm,
});

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/tasks", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      const response = await res.json();
      if (res.status == 201) {
        router.navigate({ to: "/", reloadDocument: true });
      }
    } catch (e) {}
  };

  return (
    <div className="w-full  max-h-[90vh] flex justify-center p-10">
      <div className="rounded-4xl w-100 bg-(--primary-bg) p-5 text-gray-900">
        <h1 className="text-4xl text-center">Nueva Tarea</h1>
        <hr className="my-5" />
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            placeholder="Titulo"
            className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            placeholder="Descripcion"
            className="shadow resize-y max-h-40 bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="bg-blue-500 cursor-pointer text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Crear nueva tarea
          </button>
        </form>
        <Link
          to="/"
          className="bg-blue-500 text-sm flex justify-center items-center gap-3 my-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <ArrowLeft /> Volver al inicio
        </Link>
      </div>
    </div>
  );
}
