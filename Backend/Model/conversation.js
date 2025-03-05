import mongoose from "mongoose";
import User from "./User.js"
import Message from "./message.js"
const conversationschema=new mongoose.Schema({
    members:[{//here member is an array
type:mongoose.Schema.Types.ObjectId,
ref:User,
    }],
    message:[
        {
            type:mongoose.Schema.Types.ObjectId,
ref:Message,
default:[]
        }
    ]
},{timestamps:true})

const Conversation=mongoose.model("conversation",conversationschema);
export default Conversation;