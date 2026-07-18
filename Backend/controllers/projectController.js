const Project=require("../models/Project");
const createProject = async (req, res)=>{
    try{
        const { title, description}=req.body;
        const project =await Project.create({
            title,
            description,
            owner: req.user.id,
        });
        res.status(201).json(project);

    }catch(error){
        console.log(error);
    }
};
const getProject= async (req,res)=>{
    try{
        const projects= await Project.find({
            owner: req.user.id,
        });
        res.json(projects);
    }catch(error){
        console.log(error);
    }
};
module.exports={
    createProject,
    getProject,
};