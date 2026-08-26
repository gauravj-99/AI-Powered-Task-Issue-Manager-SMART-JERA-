const express = require("express");
const router= express.Router();
const protect = require("../middleware/authMiddleware");
const managerOnly=require("../middleware/managerOnly");
const {
    generateAndAssignTasks,
}=require("../controllers/aiController");
router.post("/generate/:projectId", protect,managerOnly, generateAndAssignTasks);

module.exports= router;