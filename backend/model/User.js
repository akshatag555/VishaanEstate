const mongoose=require("mongoose");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter a name"]
    },
    email:{
        type:String,
        required:[true,"please enter a email"],
        unique:[true,"email already exists"]
    },
    password:{
        type:String,
        required:[true,"please enter password"],
        minlength:[5,"password must be 5 character"],
        select:false,
    },
    otp:{
        type:String,
    },
    otpExpire:{
        type:Date
    },
    isVerified:{
        type:Boolean,
        default:false
    }
    

})
UserSchema.pre("save",async function (next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
});
UserSchema.methods.matchPassword=async function (password){
    return await bcrypt.compare(password,this.password)
}
UserSchema.methods.generateToken= function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET);

};
module.exports=mongoose.model("User",UserSchema);