require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const protect = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const projectRoutes= require("./routes/projectRoutes");
const taskRoutes= require("./routes/taskRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");
const aiRoutes = require("./routes/aiRoutes");
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
    res.send("Jira Backend Running");
});

app.get("/api/test",
    protect,
    (req,res)=>{
        res.json({
            message: "Protected Route Working",
            user:req.user,
        });
    }
);


app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes );
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/ai",aiRoutes);

app.listen(5000, () => {
    console.log("Server Running");
});