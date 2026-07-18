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
module.exports={
    createTask,
};