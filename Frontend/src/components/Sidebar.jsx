import { LayoutDashboard, FolderKanban, LogOut, LayoutFreeform } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");

  };
  const name =
  localStorage.getItem("name");

  const role =
  localStorage.getItem("role");

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-10">
        Jira AI
      </h1>
      <div className="bg-slate-800 text-white p-4 rounded-xl mb-6">

        <div className="h-12 w-12 rounded-full bg-blue-600
         flex items-center justify-center font-bold text-xl">
          {name?.charAt(0).toUpperCase()}
        </div>

        <h2 className="mt-3 font-bold">
          {name}
        </h2>

        <p className="text-sm text-gray-300">
          {role}
        </p>

      </div>

      <div className="space-y-4">

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 w-full p-3 rounded hover:bg-slate-700"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 w-full p-3 rounded hover:bg-slate-700"
        >
          <FolderKanban size={20} />
          Projects
        </button>
        <button 
        onClick={()=>navigate("/my-tasks")}
        className="flex items-center gap-3 w-full p-3 hover:bg-slate-700"
        >
          <LayoutFreeform size={20}/>
          MyTasks
        </button>

        <button
          onClick={logoutHandler}
          className="flex items-center gap-3 w-full p-3 rounded bg-red-500 hover:bg-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>
        

      </div>
    </div>
  );
}

export default Sidebar;