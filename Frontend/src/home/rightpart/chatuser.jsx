import React from 'react'
import useconversation from '../../contextapi/useconversation.js'
import { Usercontext } from "../../contextapi/authuser";
import { useContext } from 'react';
import { CiMenuFries } from "react-icons/ci";
import { Userservercontext } from '../../contextapi/getuserserver.jsx';
function Chatuser() {
  const{socket,onlineusers}=useContext(Userservercontext);
    const{selectedconversation,message}=useconversation();
  const { user, setuser } = useContext(Usercontext);
  console.log(user);
  const isonline=onlineusers.includes(selectedconversation._id)
  return (
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
      <div>
      <div>
      {`${isonline?"online":"offline"}`}
      </div>
    
    <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300">
        
       
          <h1 className="text-xl">{selectedconversation.fullname}</h1>
         
        
      </div>
   </div>
    
    </div>
  )
}

export default Chatuser
{/* <div>{selectedconversation.fullname}</div>
<div>{selectedconversation.email}</div> */}