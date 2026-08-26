const managerOnly=(req,res,next)=>{
    if(req.user.role!=="Manager"){
        return res.status(403).json({
            message: "Manager access only",
        });
    }
    next();
};
module.exports=managerOnly;