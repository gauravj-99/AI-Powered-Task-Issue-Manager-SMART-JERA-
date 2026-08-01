const Project=require("../models/Project");
const User = require("../models/User");
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
        console.log("User:",req.user);

        const projects= await Project.find({
             owner: req.user.id,
        });
        console.log("PROJECTS:", projects)
        res.json(projects);
    }catch(error){
        console.log(error);
    }
};
const updateProject = async(req,res)=>{
    try{
        const project=await Project.findByIdAndUpdate(
            req.params.id,
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
        const project=await Project.findByIdAndDelete(
            req.params.id
        );
        if(!project){
            return rea.stautus(404).json({
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
const getProjectById = async (req,res)=>{
    try{
        const project = await Project.findById(
            req.params.id
        ).populate("members", "name email");
        if(!project){
            return res.status(404).json({
                message: "project not found",
            });
        }
        res.json(project);
    }catch(error){
        console.log(error);
    }
};
const addMember = async (req, res) => {
    try {

        const { email } = req.body;

        const project = await Project.findById(
            req.params.id
        );

        if (!project) {
            return res.status(404).json({
                message: "Project Not Found",
            });
        }

        const user = await User.findOne({
            email,
        });

        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
            });
        }

        if (project.members.includes(user._id)) {
            return res.status(400).json({
                message: "User already exists in project",
            });
        }

        project.members.push(user._id);

        await project.save();

        res.json({
            message: "Member Added Successfully",
            project,
        });

    } catch (error) {
        console.log(error);
    }
};
module.exports={
    createProject,
    getProject,
    updateProject,
    deleteProject,
    getProjectById,
    addMember,
};