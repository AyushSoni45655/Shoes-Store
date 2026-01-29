import validator from 'validator';
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import UserModel from '../modal/user.modal.js';
import bcrypt from 'bcrypt';
import hashGenrator from '../helper/hash.js';
import SendEmails from '../helper/SendEmail.js';
const createToken = (payload)=>{
  return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'2d'})
}
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required"
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid email"
      });
    }

    const checkUser = await UserModel.findOne({
      email: email.toLowerCase()
    });

    if (!checkUser) {
      return res.status(401).json({
        success: false,
        msg: "Invalid email or password"
      });
    }

    const passVerify = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!passVerify) {
      return res.status(401).json({
        success: false,
        msg: "Invalid email or password"
      });
    }

    const token = createToken({id:checkUser._id});

    const sendUser = checkUser.toObject();
    delete sendUser.password;

    return res.status(200).json({
      success: true,
      msg: "Signin successful",
      token,
      user: sendUser
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      msg: "Internal server error"
    });
  }
};


const signUp = async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;
    console.log('my phone',phone);
    
    if (!email || !password || !phone || !name) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required"
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid email"
      });
    }

    if (!validator.isMobilePhone(phone, 'en-IN')) {
      return res.status(400).json({
        success: false,
        msg: "Invalid phone number"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        msg: "Password must be at least 8 characters"
      });
    }

    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        msg: "User already exists"
      });
    }

    const hashPassword = await hashGenrator(password);

    const newUser = await UserModel.create({
      name,
      phone,
      email: email.toLowerCase(),
      password: hashPassword
    });

    const token = createToken({id:newUser._id});

    const sendUser = newUser.toObject();
    delete sendUser.password;

    return res.status(201).json({
      success: true,
      msg: "Signup completed successfully",
      token,
      user: sendUser
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error"
    });
  }
};


const OtpSendHandler = async(req,res)=>{
try{
const {email} = req.body;
if(!email || !validator.isEmail(email)){
  return res.status(400).json({success:false,msg:"Invalid email"});
}


const checkUser = await UserModel.findOne({email});
if(!checkUser){
   return res.status(404).json({success:false,msg:"User Not Found"});
}
const otp = Math.floor(100000 + Math.random() * 900000).toString();
 checkUser.resetOtp = crypto.createHash('sha256').update(otp).digest("hex");
 checkUser.resetOtpExpiry = Date.now() + 10 * 60 * 1000;
 await checkUser.save();
 await SendEmails({
  to:email,
  subject:"Password Reset OTP",
  html:`<h2>Password Reset</h2>
  <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
  `
 });

   return res.status(200).json({
      success: true,
      msg: "OTP sent to email",
    });

}catch(e){
return res.status(500).json({success:false,msg:`${e} || server error`});
}
}

 const verifyOtpHandler = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, msg: "All fields required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user || !user.resetOtp) {
      return res.status(400).json({ success: false, msg: "Invalid request" });
    }

    // ⏰ Expiry check
    if (user.resetOtpExpiry < Date.now()) {
      return res.status(400).json({ success: false, msg: "OTP expired" });
    }

    // 🔐 Hash input OTP
    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    if (hashedOtp !== user.resetOtp) {
      return res.status(400).json({ success: false, msg: "Invalid OTP" });
    }

    return res.status(200).json({
      success: true,
      msg: "OTP verified successfully"
    });

  } catch (e) {
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};



 const resetPasswordHandler = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ success: false, msg: "All fields required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // 🔐 Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // 🧹 Clear OTP fields
    user.resetOtp = null;
    user.resetOtpExpiry = null;

    await user.save();

    return res.status(200).json({
      success: true,
      msg: "Password changed successfully"
    });

  } catch (e) {
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};


const admin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid email",
      });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        msg: "Invalid credentials",
      });
    }

    const token = createToken(
      {
        email,
        role:"admin"
      }
    );

    return res.status(200).json({
      success: true,
      msg: "Login completed",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};


// getAllUsers
const getUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();

    if (allUsers.length === 0) {
      return res.status(200).json({
        success: true,
        msg: "No users found",
        users: [],
        userLength: 0
      });
    }

    return res.status(200).json({
      success: true,
      msg: "All users fetched successfully",
      users: allUsers,
      userLength: allUsers.length
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message
    });
  }
};

export{ signIn,signUp,admin,OtpSendHandler,verifyOtpHandler,resetPasswordHandler ,getUsers }