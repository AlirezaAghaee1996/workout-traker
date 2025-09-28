import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^(\+98|0)?9\d{9}$/, "Invalid phone number format"],
    unique: [true, "Phone number must be unique"],
  },
  password: {
    type: String,
    default:''
  },
 
},{timestamps:true});
const User = mongoose.model("User", userSchema);
export default User;
