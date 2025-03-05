import React, { useEffect, useRef } from "react";
import usegetmessage from '../../contextapi/usegetmessage';
import Message from "./message";
import Usegetsocketmessage from "../../contextapi/usegetsocketmessage";

function Messages() {
  const { message, selectedconversation } = usegetmessage();
  Usegetsocketmessage();

  const lastMsgRef = useRef();

  // Scroll to the last message whenever the messages change
  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [message]); // Trigger the effect whenever 'message' changes

  // Check if message and selected conversation are defined
  if (message.length === 0 && selectedconversation) {
    return (
      <div className="p-4 text-white flex justify-center">
        <p>Say Hi to start the conversation</p>
      </div>
    );
  }

  if (!selectedconversation) {
    return (
      <div className="p-4 text-white flex justify-center">
        <p>Select a conversation to see messages.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto" style={{ minHeight: "calc(92vh - 8vh)" }}>
      {/* Render messages if they exist */}
      {message.length > 0 &&
        message.map((messageItem,index) => (
          <div key={index}>
            <Message message={messageItem} />
          </div>
        ))}
      
      {/* Show a prompt when there are no messages */}
      {message.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
      
      {/* Scroll to last message */}
      <div ref={lastMsgRef} />
    </div>
  );
}

export default Messages;
