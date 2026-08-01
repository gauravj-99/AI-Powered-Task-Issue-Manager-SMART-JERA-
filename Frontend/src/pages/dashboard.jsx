import api from "../services/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([]);

  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    todoTasks: 0,
    inProgressTasks: 0,
    doneTasks: 0,
  });

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
    fetchStats();
  }, []);

  const createProject = async () => {
    try {
      await api.post(
        "/projects",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project Created");

      fetchProjects();

      setTitle("");
      setDescription("");

    } catch (error) {
      console.log(error);
    }
  };

 const fetchProjects = async () => {
  try {
    const { data } = await api.get("/projects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data); // ADD THIS

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

      alert("Project Deleted");

      fetchProjects();

    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
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

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
  <div className="flex bg-gray-100 min-h-screen">

    <Sidebar />

    <div className="flex-1 p-8">

      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">

        <div className="bg-blue-500 text-white p-4 rounded-xl shadow">
          <h3 className="font-bold">Projects</h3>
          <p className="text-3xl">
            {stats.totalProjects}
          </p>
        </div>

        <div className="bg-green-500 text-white p-4 rounded-xl shadow">
          <h3 className="font-bold">Tasks</h3>
          <p className="text-3xl">
            {stats.totalTasks}
          </p>
        </div>

        <div className="bg-yellow-500 text-white p-4 rounded-xl shadow">
          <h3 className="font-bold">Todo</h3>
          <p className="text-3xl">
            {stats.todoTasks}
          </p>
        </div>

        <div className="bg-orange-500 text-white p-4 rounded-xl shadow">
          <h3 className="font-bold">
            In Progress
          </h3>
          <p className="text-3xl">
            {stats.inProgressTasks}
          </p>
        </div>

        <div className="bg-purple-500 text-white p-4 rounded-xl shadow">
          <h3 className="font-bold">Done</h3>
          <p className="text-3xl">
            {stats.doneTasks}
          </p>
        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Create Project
        </h2>

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Project Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={createProject}
          className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600"
        >
          Create Project
        </button>

      </div>

      <h2 className="text-3xl font-bold mb-4">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {projects.map((project) => (
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

            <div className="flex gap-2">

              <button
                onClick={() =>
                  navigate(`/tasks/${project._id}`)
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Open
              </button>

              <button
                onClick={() =>
                  deleteProject(project._id)
                }
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>

    </div>

  </div>
);
}

export default Dashboard;