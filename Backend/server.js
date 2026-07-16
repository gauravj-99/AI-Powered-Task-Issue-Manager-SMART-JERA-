require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const protect = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const projectRoutes= require("./routes/projectRoutes");
const app = express();
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
app.listen(5000, () => {
    console.log("Server Running");
});