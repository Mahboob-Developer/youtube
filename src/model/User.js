// models/User.js
import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    name: { type: String, required: true,trim:true},
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerify:{type:Boolean,default:false},
    country:{type:String,default:"India"},
    profileImageUrl: { type: String, default:"" },
    isChannel:{type:Boolean,default:false},
},{ timestamps: true });
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;

