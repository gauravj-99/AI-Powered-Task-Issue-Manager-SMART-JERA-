const Project = require("../models/Project");
const Task = require("../models/Task");
const getDashboard = async (req,res)=>{
    try{
        const totalProjects=await Project.countDocuments({owner:req.user.id,});
        const userProjects=await Project.find({owner: req.user.id,});
        const projectIds=userProjects.map((project)=> project._id);
        const totalTasks= await Task.countDocuments({project:{$in: projectIds,},});
        const todoTasks =await Task.countDocuments({project:{$in:  projectIds,},status:"Todo",});
        const inProgressTasks=await Task.countDocuments({project:{$in: projectIds,},
            status: "In Progress",
        });
        const doneTasks= await Task.countDocuments({project:{$in: projectIds,},
            status:"Done",
        });
        res.json({
            totalProjects,
            totalTasks,
            todoTasks,
            inProgressTasks,
            doneTasks,
        });
    }catch(error){
        console.log(error);
    }
};
module.exports={
    getDashboard,
};