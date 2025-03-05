import React from "react";
import { useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
export const Usercontext=createContext();
 
export const Userprovider=(props)=>{
    const initialstate=Cookies.get("token") || localStorage.getItem("chatapp");
    const[user,setuser]=useState(initialstate? JSON.parse(initialstate):undefined);
    return(
        <Usercontext.Provider value={{user,setuser}}>
            {props.children}
        </Usercontext.Provider>
    )
}