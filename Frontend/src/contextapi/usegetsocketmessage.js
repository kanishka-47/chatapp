import React, { useEffect } from 'react'
import useconversation from './useconversation';
import { Userservercontext } from './getuserserver';
import { useContext } from 'react';
function Usegetsocketmessage() {
    const {socket}=useContext(Userservercontext);
    const {setmessage, message } = useconversation();
    useEffect(()=>{
        socket.on("newmessage",(newmessage)=>{
            setmessage([...message,newmessage]);
        })
        return()=>{
            socket.off("newmessage");
        }
    },[socket,message,setmessage])

}

export default Usegetsocketmessage;
