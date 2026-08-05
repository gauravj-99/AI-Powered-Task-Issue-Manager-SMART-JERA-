const project=require("../models/Project");
const Task = require("../models/Task");
const generateAndAssignTasks =async(req,res)=>{
    try{
        const project =await Project.findById(
            req.params.projectId
        ).populate(
            "members",
            "name role"
        );
        const taskToCreate=[];
        project.members.forEach((member)=>{
            if(
                member.role==="Frontend Engineer"
            ){
                tasksToCreate.push({
                    title:"Build Login UI",
                    assignedTo:member._id,
                });
                tasksToCreate.push({
                    title: "Build DashBoard UI",
                    assignedTo: member._id,
                });
            }
        })
    }
}
