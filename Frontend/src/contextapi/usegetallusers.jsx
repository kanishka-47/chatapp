//custom hook
import React, { useEffect } from 'react'
import { useState } from 'react'
import Cookies from "js-cookie"
import axios from 'axios'
function Usegetallusers() {
    const[alluser,setalluser]=useState([]);
   
   useEffect(()=>{
    console.log("Fetching users...");
    const getuser=async()=>{
        
        try{
            const token = Cookies.get("token");
            console.log("Token:", token);
            const response=await axios.get("http://localhost:3000/api/user/allusers",{
                withCredentials: true,// Include cookies in the request
                headers:{
                    Authorization:`Bearer ${token}`,
                },
               
            });
            setalluser(response.data);
         
        }catch(error){
            console.log("error in usegetalluser:"+error);
        }
    }
    getuser();
   },[]);
  return{alluser};
}

export default  Usegetallusers;
