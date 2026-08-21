const User =require("../models/user");
const jwt=require("jsonwebtoken");
const bcrypt =require("bcryptjs");
const registerUser = async (req, res) => {
  debugger;
  try{
    const{name,email,password,role}=req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(
      password,
      salt
    );
    const user=await User.create({
      name,
      email,
      password:hashedPassword,
      role,
    });
    res.status(201).json(user);
    
  }catch(error){
    console.log(error);
  }
};



const loginUser=async (req, res)=>{
  try{
    const{email,password} =req.body;
    const user =await User.findOne({email});
    if(!user){
      return res.status(404).json({
        message:common.user,
      });
    }
    const isMatch=await bcrypt.compare(
      password,
      user.password
    );
    if(!isMatch){
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    const token =jwt.sign({
      id:user._id,
    },
  process.env.JWT_SECRET,{
    expiresIn: "7d",
  });
  res.json({
    token,
  });
  }catch(error){
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
