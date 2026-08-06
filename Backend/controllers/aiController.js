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
            if(
                member.role==="backend Engineer"
            ){
                tasksToCreate.push({
                    title: "Develop Auth API",
                    assignedTo: member._id,
                });
                tasksToCreate.push({
                    title: "Develop Project API",
                    assignedTo: member._id,
                });
            }
            if( member.role==="QA Engineer"){
                tasksToCreate.push({
                    title: "Application Testing",
                    assignedTo: member._id, 
                });
            }
        });
        for(const task of tasksToCreate){
            await Task.create({
                title: task.title,
                project: project._id,
                status: "Todo",
                priority: "Medium",
                assignedTo:task.assignedTo,
            });
        }
        res.json({
            messasge:
            "Tasks Generated Sucessfully",
        });
    }catch(error){
        console.log(error);
    }
};
module.exports={generateAndAssingnTasks,};
