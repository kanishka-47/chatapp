import React from 'react'
import useconversation from '../../contextapi/useconversation.js'
import { Usercontext } from "../../contextapi/authuser";
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
function Inputbox() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const{selectedconversation,setmessage,message}=useconversation();
    const { user, setuser } = useContext(Usercontext);
    console.log("loggegin user",user);
    const onSubmit=async(data)=>{
      
        const msginfo={
            message:data.message,
            receiverid:selectedconversation._id,
            senderid:user._id,
        }
        console.log("msginfo",msginfo);
        await axios.post(`http://localhost:3000/api/message/send/${msginfo.receiverid}`,msginfo,
          {
           
            withCredentials: true, // Include credentials if using cookies
        }
        )
        .then((res)=>{
            console.log(res);
            setmessage([...message, res.data]);
            toast.success("message sent successfully")})
        .catch((error)=>{
            toast.error("error in post message");
        })
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ 
        display: 'flex', 
        width: '100%', 
        alignItems: 'center' 
      }}>
        <input 
          type="text" 
          placeholder='Send a message' 
          {...register("message", { required: true })} 
          style={{ 
            flex: '1', // Take up available space
            padding: '10px', // Padding for the input
            border: '1px solid #ccc', // Light border
            borderRadius: '4px', // Rounded corners
            marginRight: '10px' // Space between input and button
          }} 
        />
        <button type="submit" style={{ 
          padding: '10px 15px', // Button padding
          backgroundColor: '#4CAF50', // Green background
          color: 'white', // White text
          border: 'none', // No border
          borderRadius: '4px', // Rounded corners
          cursor: 'pointer', // Pointer on hover
        }}>
          Send
        </button>
      </form>
  )
}

export default Inputbox
