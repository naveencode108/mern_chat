import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    email:{
        type:String,
    },
    fullName:{
        type:String
    },
    password:{
        type:String
    },
    profilePic:{
        type:String,
        default:''
    },
},{timestamps:true}
);

export default mongoose.model("user",userSchema);