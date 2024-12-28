import React from "react";
import { useChat } from "../utils/Chatcont";
import { useIsAuth } from "../utils/IsAuth";

const ChatHeader = () => {
  const { selectedUser ,setSelectedUser,typing} = useChat();
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* profile image */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={
                  selectedUser.profilePic ||
                  "https://imgs.search.brave.com/4KZYIoORrEk3lsmtCvb5Vd6IcIfyGmibtiB0H6ZZo-o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzExLzU0LzMz/LzM2MF9GXzgxMTU0/MzMzMF9LZk5ZdWtw/RFVRZG1YSUt6Y005/Z2tLOU12dHdPTzhC/ai5qcGc"
                }
                alt={selectedUser.fullName}
              />
            </div>
          </div>

       {/*user info */}
          <div>
               <h3 className="font-medium">{selectedUser.fullName}</h3>
               <p className="text-sm text-base-content/70">
                 {typing?'typing...':''}
               </p>
          </div>
        </div>
        <button onClick={()=>setSelectedUser(null)}>X</button>
      </div>
    </div>
  );
};

export default ChatHeader;
