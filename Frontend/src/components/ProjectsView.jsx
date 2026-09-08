import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
function ProjectsView(props){
    const {
      projects,
      filteredProjects,
      search,
      setSearch,
      createProject,
      deleteProject,
      addMember,
      generateTasks,
      memberEmails,
      setMemberEmails,
      title,
      setTitle,
      description,
      setDescription,
      role,
      navigate,
    } = props;
return (
  <div className="flex bg-slate-100 min-h-screen">
    <Sidebar />

    <div className="flex-1 p-8">
      <Navbar
        search={search}
        setSearch={setSearch}
        placeholder="Search Projects..."
      />

      {role === "Manager" && (
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Create Project
          </h2>

          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />

          <button
            onClick={createProject}
            className="bg-green-600 text-white px-5 py-2 rounded"
          >
            Create Project
          </button>
        </div>
      )}

      <h2 className="text-3xl font-bold mb-6">
        Projects ({projects.length})
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (          <div
            key={project._id}
            className="bg-white p-5 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-bold">
              {project.title}
            </h3>

            <p className="text-gray-600 my-3">
              {project.description}
            </p>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">
                Members
              </h4>

              {project.members?.map((member) => (
                <div key={member._id}>
                  {member.name}
                </div>
              ))}
            </div>

            {role === "Manager" && (
              <>
                <button
                  onClick={() =>
                    generateTasks(project._id)
                  }
                  className="bg-purple-600 text-white px-4 py-2 rounded mb-3"
                >
                  AI Generate Tasks
                </button>

                <input
                  type="email"
                  placeholder="Member Email"
                  value={
                    memberEmails[project._id] || ""
                  }
                  onChange={(e) =>
                    setMemberEmails({
                      ...memberEmails,
                      [project._id]:
                        e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded mb-2"
                />

                <button
                  onClick={() =>
                    addMember(project._id)
                  }
                  className="bg-purple-600 text-white px-4 py-2 rounded w-full mb-3"
                >
                  Add Member
                </button>
              </>
            )}

            <div className="flex gap-2">
              <button
                onClick={() =>
                  navigate(
                    `/tasks/${project._id}`
                  )
                }
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Open
              </button>

              {role === "Manager" && (
                <button
                  onClick={() =>
                    deleteProject(project._id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              )}
            </div>
 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsView;