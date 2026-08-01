const Task = require("../models/Task");
const createTask= async (req, res)=>{
    try{
        const{
            title,
            description,
            priority,
            project,
            assignedTo,
        }= req.body;
        const task= await Task.create({
            title,
            description,
            priority,
            project,
            assignedTo,
        });
        res.status(201).json(task);
    } catch(error){
        console.log(error);
    }
};
const getTasks= async (req,res)=>{
    try{
        const tasks = await Task.find({
            project: req.params.projectId,
        }).populate("assignedTo", "name email");
        res.json(tasks);

    }catch (error){
        console.log(error);
    }
};
const updateTaskStatus = async (req, res)=>{
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
const deleteTask = async (req, res)=>{
    try{
        const task = await Task.findByIdAndDelete(
            req.params.id
        );
        if(!task){
            return res.status(404).json({
                message: "Task Not Found",
            });
        }
        res.status(200).json({
            message: "Task Deleted Sucessfully",
        });
    }catch{
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};
module.exports={
    createTask,
    getTasks,
    updateTaskStatus,
    deleteTask,
};