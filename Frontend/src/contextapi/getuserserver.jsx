import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import io from "socket.io-client";
import { Usercontext } from "./authuser";
import { useContext } from 'react';
export const Userservercontext=createContext();

export const Userserverprovider=(props)=>{

    const[socket,setsocket]=useState(null);
    const[onlineusers,setonlineusers]=useState([])
    const { user, setuser } = useContext(Usercontext);
    const authUser = JSON.parse(localStorage.getItem("chatapp"));
// console.log("server user",user.user._id);
useEffect(() => {
    if (user) {
        const newSocket = io("http://localhost:3000", {
            query: {
                userId: user.user._id,
            },
        });
        setsocket(newSocket);
        newSocket.on("getonlineusers",(users)=>{
setonlineusers(users);
console.log("Received online users: ", users); 
})
        return () => {
            newSocket.close();
        };
    } else {
        if (socket) {
            socket.close();
            setsocket(null);
        }
    }
}, [user]);
    return(
        <Userservercontext.Provider value={{socket,onlineusers}}>
            {props.children}
        </Userservercontext.Provider>
    )
}
