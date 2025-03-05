import React from "react"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Left from "./home/leftpart/Left"
import Right from "./home/rightpart/Right"
import { Usercontext } from "./contextapi/authuser";
import { useContext } from 'react';
import { useEffect } from "react";
import {Routes,Route, Navigate} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
function App() {
  const { user, setuser } = useContext(Usercontext); //loggedin user
  useEffect(() => {
    console.log("user", user);
  }, [user]);
  return (
    <>
   
   <Routes>
        <Route path="/" 
        element={
          user ? (
            <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
            <Right/>
              <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                Open drawer
              </label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <Left/>
              </ul>
            </div>
          </div>
          ):(
           <Navigate to={"/login"}/>
          )
        } />
        <Route path="/login" element={user? <Navigate to={"/"}/>:<Login/>}/>
        <Route path="/signup" element={user? <Navigate to={"/"}/>:<Signup/>}/>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
