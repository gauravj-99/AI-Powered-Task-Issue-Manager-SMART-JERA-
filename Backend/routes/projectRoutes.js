const express = require("express");
const router= express.Router();
const protect = require("../middleware/authMiddleware");
const managerOnly=require("../middleware/managerOnly");
const{
    createProject,
    getProject,
    updateProject,
    deleteProject,
    getProjectById,
    addMember,
}=require("../controllers/projectController");
router.get("/", protect, getProject);
router.put("/:id", protect, updateProject);
router.get("/:id", protect, getProjectById);
router.post("/", protect, managerOnly, createProject);
router.delete("/:id",protect, managerOnly,deleteProject);
router.post("/:id/add-member", protect, managerOnly, addMember);
module.exports= router;