const User = require("../model/User");
const {sendEmail}=require("../middleware/sendMail")


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(email)
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }
    
   
    
    user = await User.create(req.body);
    // const token = await user.generateToken();
    // const option = {
    //   expires: new Date(Date.now() + 90 * 24 * 3600 * 1000),
    //   httpOnly: true,
    // };
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.googleauth = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    console.log(email)
    let user = await User.findOne({ email });
    if(user){
      
    }
    else{
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
        req.body.password=generatedPassword
        user = await User.create(req.body);
    }
    
    const token = await user.generateToken();
    const option = {
      expires: new Date(Date.now() + 90 * 24 * 3600 * 1000),
      httpOnly: true,
    };
    
    
    return res.status(200).cookie("token", token, option).json({
      success: true,
      user,
      token,
    });
    
    
    // const token = await user.generateToken();
    // const option = {
    //   expires: new Date(Date.now() + 90 * 24 * 3600 * 1000),
    //   httpOnly: true,
    // };
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.otpSend=async(req,res)=>{
  try {
    const OTP_EXPIRY_TIME = 5 * 60 * 1000;
    const {email}=req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user doesnt exists",
      });
    }
    if(user.isVerified===true){
      return res.status(400).json({
        success:false,
        message:"user already verified"
      })
    }
    const characters = '0123456789'; // You can also include letters if needed
    let OTP = '';
    for (let i = 0; i < 5; i++) {
      const index = Math.floor(Math.random() * characters.length);
      OTP += characters[index];
    }
    const msg=`your otp is ${OTP}`
    // req.body.otp=1234;
    //  if(otp===user.otp&&user.otpExpire<=Date.now()){
    //   user.isVerified=true;
    //  }
    user.otp=OTP;
    user.otpExpire=Date.now()+OTP_EXPIRY_TIME;
    await user.save();
      await sendEmail({
        email: email,
        subject: "Email Verification",
        msg,
      });
    res.status(200).json({
      success:true,
      message:"EMail sent"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  
}
exports.otpVerify=async(req,res)=>{
  try {
    const OTP_EXPIRY_TIME = 5 * 60 * 1000;
    const {email,otp}=req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user doesnt exists",
      });
    }
    if(!user.otp||user.otpExpire<Date.now()||otp!==user.otp){
      return res.status(400).json({
        success: false,
        message: "Expired or Incorrect OTP",
      });
    }
    
     if(otp===user.otp&&user.otpExpire>=Date.now()){
        user.isVerified=true;
    }
    await user.save();
    const token = await user.generateToken();
    const option = {
      expires: new Date(Date.now() + 90 * 24 * 3600 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, option).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  
}
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user doesnt exists",
      });
    }
    const ismatch = await user.matchPassword(password);
    if (!ismatch) {
      return res.status(400).json({
        success: false,
        message: "incorrect password",
      });
    }
    if(!user.isVerified){
      return res.status(400).json({
        success: false,
        message: "Verify user first",
      });
    }
    const token = await user.generateToken();
    const option = {
      expires: new Date(Date.now() + 90 * 24 * 3600 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, option).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged Out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateuser=async(req,res)=>{
    try {
       //console.log(req.user)
       const email=req.body.email;
       let user1 = await User.findOne({ email });
    if (user1&&email!==req.user.email) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }
        const user = await User.findByIdAndUpdate( req.user.id,
            req.body,
            { new: true });
            res.status(200).json({
                success: true,
                message: "Profile Updated",
                user
              });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}
exports.updatepass=async(req,res)=>{
    try {
       //console.log(req.user)
       const user = await User.findById( req.user.id).select("+password");
       const {oldpass,newpass}=req.body;
       const ismatch=await user.matchPassword(oldpass);
       if(!ismatch){
        return res.status(400).json({
            success: false,
            message: "Incorrect Old Password",
          });
       }
       user.password = newpass;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
       

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}