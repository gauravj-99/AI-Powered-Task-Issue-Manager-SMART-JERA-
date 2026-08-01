const express = require("express");
const router= express.Router();
const protect = require("../middleware/authMiddleware");
const{
    createProject,
    getProject,
    updateProject,
    deleteProject,
    getProjectById,
    addMember,
}=require("../controllers/projectController");
router.post("/", protect, createProject);
router.get("/", protect, getProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);
router.get("/:id", protect, getProjectById);
router.post("/:id/add-member",protect,addMember);
module.exports= router;