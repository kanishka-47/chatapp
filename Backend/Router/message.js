import { Router } from "express";
import Message from "../Model/message.js";
import Conversation from "../Model/conversation.js";
import checkForAuthenticationCookie from "../middleware/authmiddleware.js";
import { getreceiversocketid} from "../socketio/server.js";
import { io } from "../socketio/server.js";
const router = Router();

router.post("/send/:id",checkForAuthenticationCookie(),async(req,res)=>{//here id is receiver id 
    const {message}=req.body;
    const { id: receiverid } = req.params;
     const senderid=req.user._id;
let conversation=await Conversation.findOne({
    members: { $all: [senderid, receiverid] },
})
if(!conversation){
    conversation=await Conversation.create({
        members:[senderid,receiverid]
    })
};

const newmessage=new Message({
    senderid,
    receiverid,
    message
})
if(newmessage){
    conversation.message.push(newmessage._id);
}
await Promise.all([conversation.save(),newmessage.save()]);
const receiversocketid=getreceiversocketid(receiverid);
if(receiversocketid){
    io.to(receiversocketid).emit("newmessage",newmessage);
   
}

return res.status(201).json({
    message: newmessage.message,
    newmessage
  });
})


router.get("/showmessages/:id",checkForAuthenticationCookie(),async(req,res)=>{
    const { id: receiverid } = req.params;
    const senderid=req.user._id;
    let conversation=await Conversation.findOne({
        members:{ $all: [senderid, receiverid] },
    }).populate("message");
    if(!conversation){
      return res.status(200).json([]);
    };
    const message=conversation.message;
    return res.status(200).json(message);
})


export default router;


