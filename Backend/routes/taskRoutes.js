const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const{
    createTask, getTasks, updateTaskStatus, deleteTask
}= require("../controllers/taskController");
router.post("/", protect, createTask);
router.get("/:projectId",protect,getTasks);
router.put("/:id", protect,updateTaskStatus);
router.delete("/:id",protect, deleteTask);
module.exports= router;