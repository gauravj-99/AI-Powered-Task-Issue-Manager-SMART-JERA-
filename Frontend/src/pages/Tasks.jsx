import TasksView from "../components/TasksView";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
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
  const token = localStorage.getItem("token");
  const role= localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    fetchTasks();
    fetchProject();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get(
        `/tasks/${projectId}`,
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

  const fetchProject = async () => {
    try {
      const { data } = await api.get(
        `/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setAssignedTo("");
      setDueDate("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

const updateStatus = async (id, status) => {
  try {
    await api.put(
      `/tasks/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(`Task moved to ${status}`);

    fetchTasks();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to update task"
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