const mongoose = require("mongoose");
const userSchema=new mongoose.Schema(
    {
        name : {
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:["Frontend Engineer",
                "Backend Engineer",
                "Full Stack Engineer",
                "QA Engineer",
                "DevOps Engineer"
            ],
            default: "Frontend Engineer",
        },
    },
    {
        timestamps: true,
    }
);
module.exports =
  mongoose.models.User ||
  mongoose.model("User", userSchema);