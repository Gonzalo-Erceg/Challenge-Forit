import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import Plus from "../components/icons/Plus";
import TaskList from "../components/TaskList";
import SearchInput from "../components/SearchInput";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const res = await fetch("http://localhost:3001/api/tasks");
    return res.json();
  },

  component: Index,
});

function Index() {
  const tasks = Route.useLoaderData();
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search.trim() === "") {
      setResult(tasks.data);
      return;
    }
    const t = setTimeout(async () => {
      const res = await fetch(
        `http://localhost:3001/api/tasks?title=${search}`
      );
      const data = await res.json();
      setResult(data.data);
      return () => clearTimeout(t);
    }, 400);
  }, [search]);

  const hanbleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full  min-h-[90vh] flex justify-center p-10">
      <div className="rounded-4xl w-100 bg-(--primary-bg) p-5 text-gray-900">
        <nav
          className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600
 hover:brightness-110  
active:brightness-90 "
        >
          <Link to="/TaskForm" className="flex items-center gap-4">
            Nueva tarea
            <Plus />
          </Link>
        </nav>
        <SearchInput value={search} onChenge={hanbleChange} />
        <hr className="mb-4"></hr>
        <TaskList items={result} />
      </div>
    </div>
  );
}
