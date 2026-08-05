const Project = require("../models/Project");
const User = require("../models/User");

const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
      owner: req.user.id,
    });

    res.status(201).json(project);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getProject = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user.id,
    }).populate("members", "name email");

    res.json(projects);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    ).populate("members", "name email");

    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    res.json(project);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    res.json(project);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    res.json({
      message: "Project Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const addMember = async (req, res) => {
  try {
    const { email } = req.body;

    const project = await Project.findById(
      req.params.id
    );
    console.log("PROJECT:", project);


    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }
    console.log("EMAIL:", email);

    const user = await User.findOne({
      email,
    });
    console.log("USER:", user);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const alreadyMember = project.members.some(
      (member) =>
        member.toString() ===
        user._id.toString()
    );

    if (alreadyMember) {
      return res.status(400).json({
        message: "User already added",
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

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createProject,
  getProject,
  getProjectById,
  updateProject,
  deleteProject,
  addMember,
};