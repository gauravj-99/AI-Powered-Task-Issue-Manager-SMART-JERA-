import ProjectsView from "../components/ProjectsView";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import {SUCCESS_MESSAGES,ERROR_MESSAGES,} from "../constants/messages";
import {showSuccess,showError} from "../utils/toastHelper";
function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [memberEmails, setMemberEmails] = useState({});
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const role=localStorage.getItem("role");
  // console.log("Role:", role);
  useEffect(() => {
    fetchProjects();
  }, []);
  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/projects");

      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async () => {
    if(!title.trim() || !description.trim()){
      toast.error("Title and description are required");
      return;
    }
    try {
      await api.post(
        "/projects",
        {
          title,
          description,
        }
      );

      setTitle("");
      setDescription("");
      fetchProjects();
      showSuccess(
  SUCCESS_MESSAGES.PROJECT_CREATED
);
      } catch (error) {
        showError(
  ERROR_MESSAGES.PROJECT_CREATE
);
    }
  };

  const deleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();

      showSuccess(
        SUCCESS_MESSAGES.PROJECT_DELETED
      );
    } catch (error) {
      showError(
        error.response?.data?.message ||
        ERROR_MESSAGES.PROJECT_DELETE_FAILED
      );
    }
  };

  const addMember = async (projectId) => {
    try {
      await api.post(
        `/projects/${projectId}/add-member`,
        {
          email: memberEmails[projectId],
        }
      );
      showSuccess(
        SUCCESS_MESSAGES.MEMBER_ADDED
      );
      fetchProjects();

      setMemberEmails({
        ...memberEmails,
        
      });
    } catch (error) {
      showError(
        error.response?.data?.message ||
        ERROR_MESSAGES.MEMBER_ADD_FAILED
      );
    }
  };
const generateTasks =async(
  projectId
)=>{
  try{
    await api.post(
      `/ai/generate/${projectId}`,
      {}
    );
showSuccess(
  SUCCESS_MESSAGES.AI_TASKS_GENERATED
);
  }catch (error) {
    showError(
      error.response?.data?.message ||
      ERROR_MESSAGES.AI_TASKS_GENERATION_FAILED
    );
  }
};
const filteredProjects = projects.filter(
  (project) =>
    project.title
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    project.description
      .toLowerCase()
      .includes(search.toLowerCase())
);
return (
  <ProjectsView
    projects={projects}
    filteredProjects={filteredProjects}
    search={search}
    setSearch={setSearch}
    createProject={createProject}
    deleteProject={deleteProject}
    addMember={addMember}
    generateTasks={generateTasks}
    memberEmails={memberEmails}
    setMemberEmails={setMemberEmails}
    title={title}
    setTitle={setTitle}
    description={description}
    setDescription={setDescription}
    role={role}
    navigate={navigate}
  />
);
}
export default Projects;