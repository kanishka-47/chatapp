import React from 'react'
import axios from 'axios';
import Cookies from "js-cookie"
function Logout() {
  const handlelogout=async()=>{
   await  axios.post("http://localhost:3000/api/user/logout");
   localStorage.removeItem("chatapp");
   Cookies.remove("jwt");
   alert("loggedout successfully");
   window.location.reload();//logout hone ke bad page ko automatically reload krva dega
    }
  return (
    <div>
      <button className= "bg-slate-500" onClick={handlelogout}>Logout</button>
    </div>
  )
}

export default Logout
