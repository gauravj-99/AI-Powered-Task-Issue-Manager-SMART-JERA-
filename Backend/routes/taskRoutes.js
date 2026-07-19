const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const{
    createTask,
}= require("../controllers/taskController");
router.post("/", protect, createTask);
router.get("/:projectId",protect,getTasks);
router.put("/:id", protect,updateTaskStatus);
module.exports= router;