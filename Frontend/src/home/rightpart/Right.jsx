import React from 'react';
import Chatuser from './chatuser';
import Messages from './messages';
import Inputbox from './inputbox';
import useconversation from '../../contextapi/useconversation.js'
// import { CiMenuFries } from "react-icons/ci";

function Right() {
  const{selectedconversation,setmessage,message}=useconversation();
  return (
    <div className="w-full bg-slate-900 text-gray-300">
    <div>
      {!selectedconversation ? (
        <div>no chat selected</div>
      ) : (
        <>
          <Chatuser />
          <div
            className=" flex-1 overflow-y-auto"
            style={{ maxHeight: "calc(92vh - 8vh)" }}
          >
            <Messages />
          </div>
          <Inputbox />
        </>
      )}
    </div>
  </div>
  );
}

export default Right;
