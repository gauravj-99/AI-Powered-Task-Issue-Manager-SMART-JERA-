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
const updateProject = async(req,res)=>{
    try{
        const projects=await project.findByIdAndUpdate(
            req.param.id,
            req.body,
            {new: true}
        );
        res.json(project);
    }catch(error){
        console.log(error);
    }
};
const deleteProject= async(req,res)=>{
    try{
        const projects=await project.findByIdAndDelete(
            req.param.id
        );
        if(!project){
            return rea.stautus(303).json({
                message: "Project Not Found",
            });
        }
        res.json({
            message: "Project Deleted Sucessfully",
        });
    }catch(error){
        console.log(error);
    }
};
module.exports={
    createProject,
    getProject,
    updateProject,
    deleteProject,
};