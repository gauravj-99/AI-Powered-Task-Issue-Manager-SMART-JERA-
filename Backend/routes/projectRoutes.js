const express = require("express");
const router= express.Router();
const protect = require("../middleware/authMiddleware");
const{
    createProject,
    getProject,
}=require("../controllers/projectController");
router.post("/", protect, createProject);
router.get("/", protect, getProject);
module.exports= router;