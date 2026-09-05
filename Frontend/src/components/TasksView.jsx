import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
function TasksView(props) {
    const {
    project,
    tasks,
    members,
    role,
    userId,
    search,
    setSearch,
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    assignedTo,
    setAssignedTo,
    dueDate,
    setDueDate,
    createTask,
    deleteTask,
    updateStatus,
    } = props;
const filteredTasks = tasks.filter(
  (task) =>
    task.title
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    task.description
      .toLowerCase()
      .includes(search.toLowerCase())
);

 const todoTasks = filteredTasks.filter(
  (task) => task.status === "Todo"
);

const inProgressTasks = filteredTasks.filter(
  (task) => task.status === "In Progress"
);

const doneTasks = filteredTasks.filter(
  (task) => task.status === "Done"
);

const TaskCard = ({ task }) => {

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "Done";

  return (
        <div
        className={`bg-white rounded-xl shadow p-4 mb-4 border-l-4 ${
          isOverdue
            ? "border-red-600"
            : "border-blue-600"
        }`}
      >
      <h3 className="text-lg font-bold">
        {task.title}
      </h3>

      <p className="text-gray-600 mt-2">
        {task.description}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Due:
        {" "}
        {task.dueDate
          ? new Date(
              task.dueDate
            ).toLocaleDateString()
          : "Not Set"}
      </p>
      <p className="mt-2">
        Assigned To:
        <span className="font-semibold ml-2">
          {task.assignedTo
            ? task.assignedTo.name
            : "Unassigned"}
        </span>
      </p>

      <div className="mt-3">
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
      </div>
      {isOverdue && (
      <span className="bg-red-500 text-white px-2 py-1 rounded ml-2 text-sm">
        Overdue
      </span>
    )}

      <select
      disabled={
        role !== "Manager" &&
        String(task.assignedTo?._id) !==
          String(userId)
      }
      value={task.status}
      onChange={(e) =>
        updateStatus(
          task._id,
          e.target.value
        )
      }
      className={`w-full border p-2 rounded mt-3 ${
        role !== "Manager" &&
        String(task.assignedTo?._id) !==
          String(userId)
          ? "bg-gray-200 cursor-not-allowed"
          : "bg-white"
      }`}
    >
      <option value="Todo">Todo</option>
      <option value="In Progress">
        In Progress
      </option>
      <option value="Done">Done</option>
    </select>

      {
        role==="Manager" &&(
          <button
        onClick={() =>
          deleteTask(task._id)
        }
        className="w-full mt-3 bg-red-500 text-white py-2 rounded"
      >
        Delete
      </button>
        )
      }

    </div>
  );
};
  

  return (
<div className="flex bg-slate-100 min-h-screen">
  <Sidebar />

  <div className="flex-1 p-8">
    <Navbar
      search={search}
      setSearch={setSearch}
      placeholder="Search Tasks..."
    />
      <div className="bg-slate-900 text-white p-6 rounded-xl mb-8">
        <h1 className="text-4xl font-bold">
          Project Task Board
        </h1>

        <h2 className="text-xl mt-3 text-blue-200 font-semibold">
          {project?.title}
        </h2>

        <p className="mt-2">
          {project?.description}
        </p>
      </div>
      {role ==="Manager" &&(
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        
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
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
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

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        />

        <select
          value={assignedTo}
          onChange={(e) =>
            setAssignedTo(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
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
            <button
          onClick={createTask}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Create Task
        </button>

      </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-yellow-100 p-4 rounded-xl">
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

        <div className="bg-blue-100 p-4 rounded-xl">
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

        <div className="bg-green-100 p-4 rounded-xl">
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
    </div>
  );

}

export default TasksView;