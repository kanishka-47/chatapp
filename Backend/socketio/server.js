import {Server} from "socket.io";
import http from "http";
import express from "express";
const app =express();
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin: 'http://localhost:3001',
        methods: ["GET", "POST"],
    }
})
const users={}

export const getreceiversocketid=(receiverid)=>{
    return users[receiverid];
}

io.on("connection",(socket)=>{
    console.log("a user connected",socket.id);
    const userId=socket.handshake.query.userId;
    console.log("userId",userId);
    if(userId){
        users[userId]=socket.id;
    }
    console.log("server",users);
    io.emit("getonlineusers",Object.keys(users))//to send the data to al the users
    socket.on("disconnect",()=>{
        console.log("a user dissconnect",socket.id);
        delete users[userId];
        io.emit("getonlineusers",Object.keys(users))
    })
})

export  {app,server,io};