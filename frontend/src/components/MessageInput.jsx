import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../utils/Chatcont";
import { FcAddImage } from "react-icons/fc";
import { IoIosSend } from "react-icons/io";
import axios from "../utils/Axios";
import { useIsAuth } from "../utils/IsAuth";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePrev, setImagePrev] = useState(null);
  const fileRef = useRef(null);
  const { sendMessages, selectedUser, } = useChat();

  const handleImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePrev(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = (e) => {
    setImagePrev(null);
    if (fileRef.current.value != "") {
      fileRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim() && !imagePrev) {
      return;
    }
     

    try {
      await sendMessages({
        text: text.trim(),
        image: imagePrev,
      });

      setText("");
      setImagePrev(null);
      fileRef.current.value = "";
    } catch (er) {
      console.log(er.message);
    }
  };

  
  useEffect(()=>{
      
    const fetch=async()=>{
        let res=await axios.post('/api/messages/get_typing',{senderId:selectedUser._id,textLength:text.length},{withCredentials:true});
    }

    fetch();

  },[text])


  return (
    <div className="p-4 w-full">
      {imagePrev && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePrev}
              alt="prev"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300"
              onClick={removeImage}
            >
              X
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a Message..."
            value={text}
            onChange={(e) => {
              // handleText(e);
              setText(e.target.value);
            }}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
            ref={fileRef}
          />
          <button
            type="button"
            onClick={() => fileRef.current.click()}
            className="hidden sm:flex btn btn-circle"
          >
            <FcAddImage className="size-3 sm:size-5" />
          </button>
        </div>
        <button
          className="btn  btn-circle"
          disabled={!text.trim() && !imagePrev}
        >
          <IoIosSend className="size-5" />
        </button>
      </form>
    </div>
  );
};

export default React.memo(MessageInput);
