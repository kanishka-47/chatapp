import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import useconversation from '../../contextapi/useconversation';
import Usegetallusers from '../../contextapi/usegetallusers';
import toast, { Toaster } from 'react-hot-toast';
function Search() {
  const[search,setsearch]=useState("");
  const {alluser}=Usegetallusers();
  console.log("search",alluser);
  const{selectedconversation,setselectedconversation}=useconversation();
  const handlesearch=(e)=>{
    e.preventDefault();
    if(!search)return;
 const conversation=alluser.find((user)=>
user.fullname.toLowerCase().includes(search.toLowerCase())
);
if(conversation){
  setselectedconversation(conversation);
  console.log("selectedconversation",selectedconversation);
  setsearch("");
}
else{
  console.log("selectedconversation",selectedconversation);
  toast.error("user not found");
}
  }
  return (
    <div className='px-6 py-4'>
      <form onSubmit={handlesearch}>
        <div className='flex space-x-3' >

       
      <label className="input input-bordered flex items-center gap-2 w-[85%]">
  <input type="text" className="grow text-black" placeholder="Search"
  value={search} onChange={(e)=>{setsearch(e.target.value)}} />
  
</label>
<button>
<CiSearch className='text-5xl p-2 hover:bg-gray-600 rounded-full duration-300'/>
</button>
</div>
      </form>
    </div>
  )
}

export default Search
