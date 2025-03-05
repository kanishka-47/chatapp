import React from 'react'
import useconversation from '../../contextapi/useconversation'
import { useContext } from 'react';
import { Userservercontext } from '../../contextapi/getuserserver';
function User({user}) {
  const{selectedconversation,setselectedconversation}=useconversation();
const{socket,onlineusers}=useContext(Userservercontext);
console.log("error",socket,onlineusers);
const isonline=onlineusers.includes(user._id)
  return (
    <div onClick={()=>{setselectedconversation(user)}}>
      <div className='flex space-x-4 px-6 py-3 hover:bg-slate-600 duration-300'>
   <div className={`avatar ${isonline? "online":""}`}>
   {/* <div className="avatar online" > */}
  <div className="w-12 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>
<div>
    <h1>{user.fullname}</h1>
    <span>{user.email}</span>
</div>
   </div>
    </div>
  )
}

export default User
