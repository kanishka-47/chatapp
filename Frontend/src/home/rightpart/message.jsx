import React from "react";
import { Usercontext } from "../../contextapi/authuser";
import { useContext } from 'react';
function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("chatapp"));
  
  const itsMe = message.senderid === authUser.user._id;

  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "bg-gray-300"; // Change for clarity

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`p-4 ${chatName}`}>
    <div
      className={`chat-bubble text-black ${chatColor}`}
     
    >
      {message.message}
    </div>
    {/* <div className="chat-footer text-gray-400">{formattedTime}</div> */}
  </div>
  );
}

export default Message;
