import { LayoutDashboard, FolderKanban, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-10">
        Jira AI
      </h1>

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