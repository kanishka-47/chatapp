import React from 'react'
import User from './User'
import Cookies from "js-cookie"
import Usegetallusers from "../../contextapi/usegetallusers"
function Users() {
  const {alluser}=Usegetallusers();
  console.log("alluser",alluser); 
  const token=Cookies.get("token");
          
  console.log("Token:", token);
 
  return (
    <div>
      <h1 className='my-2 px-8 py-2 text-white font-semibold bg-slate-700 rounded-md'>Messages</h1>
   <div className="overflow-y-auto" style={{maxHeight:"calc(80vh)"}}>
   {alluser.map(user => <User key={user._id} user={user} />)}
   </div>
    </div>
  )
}

export default Users
