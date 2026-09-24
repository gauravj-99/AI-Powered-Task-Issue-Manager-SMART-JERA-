import MyTasksView from "../components/MyTasksView";
import { useEffect, useState } from "react";
import api from "../services/api";
// import { toast } from "react-toastify";
import {SUCCESS_MESSAGES,ERROR_MESSAGES,} from "../constants/messages";
import {showSuccess,showError,} from "../utils/toastHelper";
function MyTasks() {
  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get(
        "/tasks/my-tasks"
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

  const filteredTasks = tasks.filter(
    (task) =>
      task.title?.toLowerCase()
        .includes(search.toLowerCase()) ||
      task.description?.toLowerCase()
        .includes(search.toLowerCase())
  );
  return (
    <MyTasksView
      tasks={tasks}
      search={search}
      setSearch={setSearch}
      totalTasks={totalTasks}
      completedTasks={completedTasks}
      inProgressTasks={inProgressTasks}
      todoTasks={todoTasks}
      filteredTasks={filteredTasks}
      updateStatus={updateStatus}
    />

  )
}
export default MyTasks;
