import DashboardView from "../components/DashboardView";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
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

  useEffect(() => {
    fetchDashboard();
    fetchProjects();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get(
        "/dashboard"
      );

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await api.get(
        "/projects"
      );

      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
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
    <DashboardView
      stats={stats}
      projects={projects}
      filteredProjects={filteredProjects}
      navigate={navigate}
      deleteProject={deleteProject}
      search={search}
      setSearch={setSearch}
    />
  );
}

export default Dashboard;