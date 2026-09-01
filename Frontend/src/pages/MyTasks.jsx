import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
function MyTasks() {
  const [tasks, setTasks] =
    useState([]);
  const token =
    localStorage.getItem("token");
  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      const { data } =
        await api.get(
          "/tasks/my-tasks",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setTasks(data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <Navbar />

        <h1 className="text-3xl font-bold mb-6">
          My Tasks
        </h1>
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-5 rounded-xl shadow"
            >
              <h2 className="font-bold">
                {task.title}
              </h2>
              <p>
                Project:
                {task.project?.title}
              </p>
              <p>
                Status:
                {task.status}
              </p>
              <p>
                Priority:
                {task.priority}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyTasks;