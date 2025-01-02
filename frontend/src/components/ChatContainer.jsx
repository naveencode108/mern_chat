import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useChat } from "../utils/Chatcont";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useIsAuth } from "../utils/IsAuth";

import { FiDownload } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const ChatContainer = () => {
  const {
    selectedUser,
    getMessages,
    messages,
    loading,
    subMessages,
    unsubMessages,
  } = useChat();
  const { onlineUsers, auth } = useIsAuth();
  const viewRef = useRef();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const imageModal = (url) => {
    setOpen(true);
    setSelectedImage(url);
  };

  useEffect(() => {
    getMessages(selectedUser._id);
    subMessages();
    return () => {
      unsubMessages();
    };
  }, [selectedUser._id]);

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col overflow-auto relative">
      <ChatHeader />

      {loading ? (
        <div className=" w-full h-screen flex justify-center">
          <span className="loading loading-dots"></span>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y">
            {messages.map((item) => {
              return (
                <div
                  key={item._id}
                  className={`chat ${
                    item.receiverId === selectedUser._id
                      ? "chat-end"
                      : "chat-start"
                  }`}
                >
                  <div className="chat-image avatar">
                    <div className="size-10 rounded-full border">
                      <img
                        src={
                          item.receiverId === auth._id
                            ? selectedUser.profilePic ||
                              "https://imgs.search.brave.com/4KZYIoORrEk3lsmtCvb5Vd6IcIfyGmibtiB0H6ZZo-o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzExLzU0LzMz/LzM2MF9GXzgxMTU0/MzMzMF9LZk5ZdWtw/RFVRZG1YSUt6Y005/Z2tLOU12dHdPTzhC/ai5qcGc"
                            : auth.profilePic ||
                              "https://imgs.search.brave.com/4KZYIoORrEk3lsmtCvb5Vd6IcIfyGmibtiB0H6ZZo-o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzExLzU0LzMz/LzM2MF9GXzgxMTU0/MzMzMF9LZk5ZdWtw/RFVRZG1YSUt6Y005/Z2tLOU12dHdPTzhC/ai5qcGc"
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
                        onClick={() => imageModal(item.image)}
                        src={item.image}
                        alt="attachment"
                        className="sm:max-w-[200px] rounded-md mb-2 cursor-pointer"
                      />
                    )}
                    {item.text && (
                      <p>
                        {item.text}
                        <span className="text-[10px] text-right block">
                          {new Date(item.createdAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: "false",
                            }
                          )}
                        </span>
                      </p>
                    )}
                    <div ref={viewRef} />
                  </div>
                </div>
              );
            })}
          </div>

          {open && (
            <div className="w-full h-full absolute bg-black/40 backdrop-blur-md overflow-hidden">
              {/*  */}
              <div className=" flex items-center justify-between py-1 px-1 space-x-4">
                <a
                  href={selectedImage.replace(
                    "/upload/",
                    "/upload/fl_attachment/"
                  )}
                  download="image.jpg"
                  className="flex items-center  text-white bg-base-100 btn btn-square px-1 py-1 rounded-lg"
                >
                  <FiDownload size={20} />
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center space-x-1 text-white  px-1 py-1 rounded-lg btn btn-square"
                >
                  <AiOutlineClose size={20} />
                </button>
              </div>
              {/*  */}
              <div className="flex justify-center items-center w-full">
                <img
                  src={selectedImage}
                  alt="No image preview"
                  className="h-96 object-contain rounded-lg"
                />
              </div>
            </div>
          )}
        </>
      )}

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
