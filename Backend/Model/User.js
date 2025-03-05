import mongoose from "mongoose";

const Userschema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,

    },
    confirmpassword:{
        type:String,
        // required:true
    }
},{timestamps:true})
 const User=mongoose.model("user",Userschema);
 export default User;