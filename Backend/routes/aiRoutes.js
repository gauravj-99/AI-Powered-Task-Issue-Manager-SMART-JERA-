const express = require("express");
const router= express.Router();
const {
    generateAndAssignTasks,
}=require("../controllers/aiController");
router.post(
    "/generate/:projectId",
    generateAndAssignTasks
);
module.exports= router;