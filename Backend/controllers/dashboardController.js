const Project = require("../models/Project");
const Task = require("../models/Task");
const getDashboard = async (req,res)=>{
    try{
        const totalProjects=await Project.countDocuments();
        const totalTasks= await Task.countDocuments({
            status: "Todo",
        });
        const inProgressTasks=await Task.countDocuments({
            status: "In Progess",
        });
        const doneTasks= await Task.countDocuments({
            stauts:"Done",
        });
        res.json({
            totalProjects,
            totalTasks,
            todoTasks,
            inProgessTasks,
            doneTasks,
        });
    }catch(error){
        console.log(error);
    }
};
module.exports={
    getDashboard,
};