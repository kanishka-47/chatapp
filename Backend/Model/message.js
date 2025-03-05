import mongoose from "mongoose";
import User from "./User.js";

//senderid=>loggedin user message krega user.id
//receiverid,message
const messageschema=new mongoose.Schema({
senderid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:User,//user model ka reference lekr sender id leni h
required:true
},
receiverid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:User,//user model ka reference lekr receiver id leni h
required:true
},
message:{
    type:String,
    required:true
}
},{timestamps:true})

const Message=mongoose.model("message",messageschema)
export default Message;