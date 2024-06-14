const User= require("../model/User")
const jwt=require("jsonwebtoken")
exports.isauth= async(req,res,next)=>{
    try {
        const {token}=req.cookies;
    if(!token){
        return res.status(401).json({
            message:"please login first"
        })
    }
    const decoded=await jwt.verify(token,process.env.JWT_SECRET)
    req.user=await User.findById(decoded._id);
    next();
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}