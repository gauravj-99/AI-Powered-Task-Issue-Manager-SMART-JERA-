const express = require("express");
const router= express.Router();
const protect = require("../middleware/authMiddleware");
const{
    createProject,
    getProject,
}=require("../controllers/projectController");
router.post("/", protect, createProject);
router.get("/", protect, getProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);
module.exports= router;