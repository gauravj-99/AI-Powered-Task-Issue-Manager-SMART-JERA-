import TasksView from "../components/TasksView";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import {SUCCESS_MESSAGES,ERROR_MESSAGES,} from "../constants/messages";
import {showSuccess,showError,} from "../utils/toastHelper";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import { toast } from "react-toastify";
function Tasks() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("");
  
  const [search, setSearch] = useState("");
  const [dueDate, setDueDate] = useState("");
  const role= localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    fetchTasks();
    fetchProject();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get(
        `/tasks/${projectId}`
      );

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProject = async () => {
    try {
      const { data } = await api.get(
        `/projects/${projectId}`
      );
      setProject(data);
      setMembers(data.members || []);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async () => {
    try {
      await api.post(
        "/tasks",
        {
          title,
          description,
          priority,
          dueDate,
          project: projectId,
          assignedTo,
        }
      );

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setAssignedTo("");
      setDueDate("");
      fetchTasks();
      showSuccess(
        SUCCESS_MESSAGES.TASK_CREATED
      );
    } catch (error) {
      showError(
        error.response?.data?.message ||
        ERROR_MESSAGES.TASK_CREATE_FAILED
      );

      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`
      );

      fetchTasks();
      showSuccess(
        SUCCESS_MESSAGES.TASK_DELETED
      );
    } catch (error) {
      showError(
        error.response?.data?.message ||
        ERROR_MESSAGES.TASK_DELETE_FAILED
      );

      console.log(error);
    }
  };

const updateStatus = async (id, status) => {
  try {
    await api.put(
      `/tasks/${id}`,
      { status }
    );

    showSuccess(
      SUCCESS_MESSAGES.TASK_MOVED
    );

    fetchTasks();
  } catch (error) {
    showError(
      error.response?.data?.message ||
      ERROR_MESSAGES.TASK_MOVE_FAILED
    );

    console.log(error);
  }
};
  return (
    <TasksView
      project={project}
      tasks={tasks}
      members={members}
      role={role}
      userId={userId}
      search={search}
      setSearch={setSearch}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      priority={priority}
      setPriority={setPriority}
      assignedTo={assignedTo}
      setAssignedTo={setAssignedTo}
      dueDate={dueDate}
      setDueDate={setDueDate}
      createTask={createTask}
      deleteTask={deleteTask}
      updateStatus={updateStatus}
    />
  );
}
export default Tasks;