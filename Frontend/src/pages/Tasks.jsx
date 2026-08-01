import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";

function Tasks() {
  const { projectId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);
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
          project: projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Created");

      setTitle("");
      setDescription("");
      setPriority("Medium");

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

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const todoTasks = tasks.filter(
    (task) => task.status === "Todo"
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const doneTasks = tasks.filter(
    (task) => task.status === "Done"
  );

  const TaskCard = ({ task }) => (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4">
      <h3 className="font-bold text-lg">
        {task.title}
      </h3>

      <p className="text-gray-600 mt-2">
        {task.description}
      </p>
        <p className="mt-2">
        Assigned To:
        {task.assignedTo
            ? task.assignedTo.name
            : "Unassigned"}
        </p>
      <p className="mt-2 text-sm">
        Priority:
        <span
            className={
            task.priority === "High"
            ? "bg-red-500 text-white px-2 py-1 rounded"
            : task.priority === "Medium"
            ? "bg-yellow-500 text-white px-2 py-1 rounded"
            : "bg-green-500 text-white px-2 py-1 rounded"
        }
        >
        {task.priority}
        </span>
      </p>
        <select
        value={assignedTo}
        onChange={(e) =>
            setAssignedTo(e.target.value)
        }
        className="w-full p-3 border rounded-lg mb-4"
        >
        <option value="">
            Select Member
        </option>

        {members.map((member) => (
            <option
            key={member._id}
            value={member._id}
            >
            {member.name}
            </option>
        ))}
        </select>
      <div className="mt-3">
        <select
          value={task.status}
          onChange={(e) =>
            updateStatus(
              task._id,
              e.target.value
            )
          }
          className="w-full border rounded-lg p-2"
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

      <button
        onClick={() =>
          deleteTask(task._id)
        }
        className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
      >
        Delete Task
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="bg-slate-900 text-white p-6 rounded-xl mb-6">
  <h1 className="text-4xl font-bold">
    Jira Task Board
  </h1>

  <p>
    Manage and track tasks efficiently
  </p>
</div>
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Create Task
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full p-3 border rounded-lg mb-4"
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          className="w-full p-3 border rounded-lg mb-4"
        >
          <option value="Low">
            Low
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">
            High
          </option>
        </select>

        <button
          onClick={createTask}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Create Task
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-yellow-100 rounded-xl p-4">
          <h2 className="text-xl font-bold mb-4">
            Todo ({todoTasks.length})
          </h2>

          {todoTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
            />
          ))}
        </div>

        <div className="bg-blue-100 rounded-xl p-4">
          <h2 className="text-xl font-bold mb-4">
            In Progress ({inProgressTasks.length})
          </h2>

          {inProgressTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
            />
          ))}
        </div>

        <div className="bg-green-100 rounded-xl p-4">
          <h2 className="text-xl font-bold mb-4">
            Done ({doneTasks.length})
          </h2>

          {doneTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default Tasks;