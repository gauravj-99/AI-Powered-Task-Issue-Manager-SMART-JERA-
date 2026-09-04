import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    todoTasks: 0,
    inProgressTasks: 0,
    doneTasks: 0,
  });

  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();
  const [search, setSearch]=useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboard();
    fetchProjects();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get(
        "/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await api.get(
        "/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await api.delete(
        `/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProjects();
      fetchDashboard();
    } catch (error) {
      console.log(error);
    }
  };
  const filteredProjects= projects.filter(
    (project)=>
      project.title?.toLowerCase()
    .includes(search.toLowerCase()) ||
      project.description?.toLowerCase()
      .includes(search.toLowerCase())
  );
  console.log("Search Value:", search);
  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">

        <Navbar
          search={search}
          setSearch={setSearch}
          placeholder="Search Projects..."
        />

        <div className="mb-8 bg-slate-900 text-white rounded-xl p-6">
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-300">
            Welcome to Jira AI Project Management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">

          <div
            className="bg-blue-500 text-white p-5 rounded-xl shadow cursor-pointer"
            onClick={() => navigate("/projects")}
          >
            <h3 className="font-bold">
              Projects
            </h3>

            <p className="text-3xl">
              {stats.totalProjects}
            </p>
          </div>

          <div className="bg-green-500 text-white p-5 rounded-xl shadow">
            <h3 className="font-bold">
              Tasks
            </h3>

            <p className="text-3xl">
              {stats.totalTasks}
            </p>
          </div>

          <div className="bg-yellow-500 text-white p-5 rounded-xl shadow">
            <h3 className="font-bold">
              Todo
            </h3>

            <p className="text-3xl">
              {stats.todoTasks}
            </p>
          </div>

          <div className="bg-orange-500 text-white p-5 rounded-xl shadow">
            <h3 className="font-bold">
              In Progress
            </h3>

            <p className="text-3xl">
              {stats.inProgressTasks}
            </p>
          </div>

          <div className="bg-purple-500 text-white p-5 rounded-xl shadow">
            <h3 className="font-bold">
              Done
            </h3>

            <p className="text-3xl">
              {stats.doneTasks}
            </p>
          </div>

        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            Recent Projects ({filteredProjects.length})
          </h2>

          <button
            onClick={() => navigate("/projects")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Manage Projects
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-bold mb-2">
                {project.title}
              </h3>

              <p className="text-gray-600 mb-4">
                {project.description}
              </p>

              <p className="mb-4 text-sm text-gray-500">
                Members :
                {" "}
                {project.members?.length || 0}
              </p>

              <div className="flex gap-2">

                <button
                  onClick={() =>
                    navigate(
                      `/tasks/${project._id}`
                    )
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Open
                </button>

                {localStorage.getItem("role") === "Manager" && (
                <button
                  onClick={() =>
                    deleteProject(project._id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              )}

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;