import React, { useEffect, useRef } from "react";
import { useChat } from "../utils/Chatcont";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useIsAuth } from "../utils/IsAuth";

const ChatContainer = () => {
  const {
    selectedUser,
    getMessages,
    messages,
    loading,
    subMessages,
    unsubMessages,
  } = useChat();
  const { onlineUsers ,auth} = useIsAuth();
  const viewRef=useRef();

   useEffect(()=>{
        getMessages(selectedUser._id);
        subMessages();
        return()=>{
          unsubMessages();
        }
    },[selectedUser._id]);

    useEffect(()=>{
      if(viewRef.current){
        viewRef.current.scrollIntoView({behavior:'smooth'})
      }
    },[messages]);


  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y">
        {messages.map((item) => {
          return (
            <div
              key={item._id}
              className={`chat ${
                item.receiverId === selectedUser._id ? "chat-end" : "chat-start"
                // item.senderId._id === auth ? "chat-start" : "chat-end"
              }`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      // item.senderId._id == selectedUser._id
                      // item.senderId._id === auth._id
                      item.receiverId === auth._id
                         ? selectedUser.profilePic
                        ||"https://imgs.search.brave.com/4KZYIoORrEk3lsmtCvb5Vd6IcIfyGmibtiB0H6ZZo-o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzExLzU0LzMz/LzM2MF9GXzgxMTU0/MzMzMF9LZk5ZdWtw/RFVRZG1YSUt6Y005/Z2tLOU12dHdPTzhC/ai5qcGc"
                        : 
                         auth.profilePic
                          ||"https://imgs.search.brave.com/4KZYIoORrEk3lsmtCvb5Vd6IcIfyGmibtiB0H6ZZo-o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzExLzU0LzMz/LzM2MF9GXzgxMTU0/MzMzMF9LZk5ZdWtw/RFVRZG1YSUt6Y005/Z2tLOU12dHdPTzhC/ai5qcGc"
                    }
                    alt="pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-sm opacity-50 ml-1">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  })}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {item.image && (
                  <img
                    src={item.image}
                    alt="attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {item.text && (
                  <p>
                    {item.text}
                    <span className="text-[10px] text-right block">
                      {new Date(item.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: "false",
                      })}
                    </span>
                  </p>
                )}
              <div ref={viewRef} />
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
