require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
    res.send("Jira Backend Running");
});

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
app.listen(5000, () => {
    console.log("Server Running");
});