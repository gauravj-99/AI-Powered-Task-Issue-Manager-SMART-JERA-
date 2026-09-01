const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const managerOnly = require("../middleware/managerOnly");
const{
    createTask, getTasks, updateTaskStatus, deleteTask, getMyTasks
}= require("../controllers/taskController");
router.get("/my-tasks",protect,getMyTasks);
router.get("/:projectId",protect,getTasks);
router.put("/:id", protect,updateTaskStatus);
router.post("/",protect,managerOnly,createTask);
router.delete("/:id",protect,managerOnly,deleteTask);
module.exports= router;