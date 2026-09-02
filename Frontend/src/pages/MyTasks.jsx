import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
function MyTasks() {
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get(
        "/tasks/my-tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };
const updateStatus = async (
  taskId,
  status
) => {
  try {
    await api.put(
      `/tasks/${taskId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Task status updated");

    fetchTasks();

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Failed to update task"
    );

    console.log(error);
  }
};

const totalTasks = tasks.length;

const completedTasks = tasks.filter(
  (task) => task.status === "Done"
).length;

const inProgressTasks = tasks.filter(
  (task) => task.status === "In Progress"
).length;

const todoTasks = tasks.filter(
  (task) => task.status === "Todo"
).length;

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <Navbar />

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              My Tasks
            </h1>

            <p className="text-gray-500 mt-2">
              Manage and track your assigned work
            </p>
          </div>

          <div className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow">
            Total Tasks : {totalTasks}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">
              Todo Tasks
            </h3>

            <p className="text-3xl font-bold mt-2 text-gray-800">
              {todoTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">
              In Progress
            </h3>

            <p className="text-3xl font-bold mt-2 text-blue-600">
              {inProgressTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">
              Completed
            </h3>

            <p className="text-3xl font-bold mt-2 text-green-600">
              {completedTasks}
            </p>
          </div>

        </div>

        {/* Empty State */}
        {tasks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center">

            <h2 className="text-2xl font-bold mb-3">
              No Tasks Assigned
            </h2>

            <p className="text-gray-500">
              You currently do not have any assigned tasks.
            </p>

          </div>
        ) : (

          <div className="grid lg:grid-cols-2 gap-6">

            {tasks.map((task) => (

              <div
                key={task._id}
                className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition-all duration-300 border-l-4 border-blue-600"
              >
                <div className="flex justify-between items-start">

                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      {task.title}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Project :
                      <span className="ml-1 font-medium">
                        {task.project?.title}
                      </span>
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-600"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {task.priority}
                  </span>

                </div>

                <div className="mt-4">
                  <p className="text-gray-600">
                    {task.description}
                  </p>
                </div>

                <div className="mt-5">

                  <div className="mb-3">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium
                      ${
                        task.status === "Done"
                          ? "bg-green-100 text-green-600"
                          : task.status ===
                            "In Progress"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <label className="block text-sm text-gray-500 mb-2">
                    Update Status
                  </label>

                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateStatus(
                        task._id,
                        e.target.value
                      )
                    }
                    className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Todo">
                      Todo
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Done">
                      Done
                    </option>
                  </select>

                </div>

              </div>

            ))}

          </div>

        )}
      </div>
    </div>
  );
}

export default MyTasks;