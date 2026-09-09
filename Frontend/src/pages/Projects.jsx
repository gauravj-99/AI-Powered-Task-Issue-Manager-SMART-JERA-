import ProjectsView from "../components/ProjectsView";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
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
      toast.success("Project Created Successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to Create Project"
      );
    }
  };

  const deleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();

      toast.success("Project Deleted Successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to Delete Project"
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
      toast.success("Member Added Successfully");

      fetchProjects();

      setMemberEmails({
        ...memberEmails,
        
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to Add Member"
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
    toast.success("Tasks Generate Successfully");
  }catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to Generate Tasks"
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