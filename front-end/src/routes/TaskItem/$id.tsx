import { createFileRoute, Link } from "@tanstack/react-router";
import Edit from "../../components/icons/Edit";
import ArrowLeft from "../../components/icons/ArrowLeft";
export const Route = createFileRoute("/TaskItem/$id")({
  component: TaskItem,
  loader: async ({ params }) => {
    const { id } = params;
    const res = await fetch(`http://localhost:3001/api/tasks/${id}`);
    const response = await res.json();
    return response;
  },
});

function TaskItem() {
  const task = Route.useLoaderData();

  return (
    <div className="flex flex-col p-5 h-fit  m-auto my-5 border w-80 focus-within:border-(--primary) transition duration-300 pr-3 gap-2 bg-white border-gray-500/30 h-[46px] rounded-[5px] ">
      <h1>Titulo</h1>
      <div className="border border-gray-500/30 rounded-[5px] p-3">
        <p>{task.data.title}</p>
      </div>
      <h2>Decripcion</h2>
      <div className="border border-gray-500/30 rounded-[5px] p-3">
        <p>{task.data.description}</p>
      </div>
      <p>Creada el: {task.data.createdAt}</p>
      <p>{task.data.completed ? "" : "No"} completada</p>
      <Link
        to="/TaskItem/TaskItemEdit/$id"
        params={{ id: task.data.id }}
        className="flex items-center gap-2 bg-blue-500 text-sm flex justify-center items-center gap-3 my-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        <Edit /> Modificar tarea
      </Link>
      <Link
        to="/"
        className="bg-blue-500 text-sm flex justify-center items-center gap-3  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        <ArrowLeft /> Volver al inicio
      </Link>
    </div>
  );
}
