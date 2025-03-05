import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userrouter from "./Router/signup.js"
import messagerouter from "./Router/message.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import {app,server} from "./socketio/server.js"

// const app=express();
dotenv.config();

const URI=process.env.MONGODB_URI;
try{
mongoose.connect(URI,{
    dbName:"restorent"
});
console.log("mongodb connected");
}catch(error){
    console.log(error);
}

const PORT=process.env.PORT;



app.use(cors({//connect frontend and backend
    origin:process.env.FRONTEND_URL,
    methods: ["GET,POST,PUT,DELETE"],
    credentials: true, //this indicate that browser send cookied and authentication information
}))
app.use(express.json()); //convert json string to a javascript object
app.use(cookieParser());//req se jo kie aayi h use parse krta h and req.cookies ko accessible bnata h
app.use(express.urlencoded({extended: false}));//form se jo data aata h use parse krta h 
app.get("/",(req,res)=>{
    res.send("hello");
})
app.use("/api/user",userrouter);
app.use("/api/message",messagerouter);


server.listen(PORT,()=>{
    console.log(`server start on port ${PORT}`)
})