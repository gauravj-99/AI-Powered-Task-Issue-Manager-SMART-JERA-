import MyTasksView from "../components/MyTasksView";
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
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
