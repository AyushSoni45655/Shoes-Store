import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
   
  },
  name: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim:true
  },
    // 🔐 Forgot Password Fields
  resetOtp: {
    type: String,
    default: null
  },
  resetOtpExpiry: {
    type: Date,
    default: null
  }


}, {
  timestamps: true
});

// ✅ Correct model name
const UserModel = mongoose.models.User || mongoose.model("User", UserSchema, "users");
export default UserModel;
