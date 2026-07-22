const express = require("express");
const router= express.Router();
const protect = require("../middleware/authMiddleware");
const{
    createProject,
    getProject,
    updateProject,
    deleteProject,
    getProjectById,
}=require("../controllers/projectController");
router.post("/", protect, createProject);
router.get("/", protect, getProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);
router.get("/:id", protect, getProjectById);
module.exports= router;