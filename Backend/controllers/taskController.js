const Task = require("../models/Task");
const createTask= async (req, res)=>{
    try{
        const{
            title,
            description,
            priority,
            project,
        }= req.body;
        const task= await Task.create({
            title,
            description,
            priority,
            project,
            assignedTo: req.user.id,
        });
        res.status(201).json(task);
    } catch(error){
        console.log(error);
    }
};
const getTasks= async (req,res)=>{
    try{
        const tasks= await Task.find({
            project: req.params.projectId,
        });
        res.json(tasks);

    }catch (error){
        console.log(error);
    }
};
const updateTaskStatus = asyns (req, res)=>{
    try{
        const task= await Task.findByIdAndUpdate(req.params.id,
            {
                status: req.body.status,
            },
            {
                new:true,
            }
        );
        res.json(task);
    }catch(error){
        console.log(error);
    }
};
module.exports={
    createTask,
    getTasks,
    updateTaskStatus,
};