import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
    
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
    
  },
  password: { 
    type: String, 
    required: true 
    
  },
    // 🔥 New streak fields
  lastLoginDate: { 
    type: Date, 
    default: null 
  },
  currentStreak: { 
    type: Number, 
    default: 0 
  },
  highestStreak: { 
    type: Number, 
    default: 0 
  }
});
const User = mongoose.model("registered_User", userSchema);
export default User;
